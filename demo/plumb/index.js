const flowchartData = JSON.parse(window.localStorage.getItem("flowchartData")) || flowchartDataDefault;
const connectionData = JSON.parse(window.localStorage.getItem("connectionData")) || connectionDataDefault;
// 被选择的节点
let selectedNode = null;
// 创建实例
const instance = jsPlumb.getInstance();
// 基本
let canvas = document.getElementById("canvas");
let container = document.getElementById("container");
let selectedElements = [];
// 节点移动初始位置
let startPos = null;
// 预览模式是否是滚动模式
let isScroll = false;
// 初始化流程图
jsPlumb.ready(reload);

// 导出数据按钮点击事件处理程序
$("#exportBtn").click(function () {
	exportBtnHandle(instance);
});

// [添加节点] 按钮点击事件处理程序
$("#addNodeBtn").click(function () {
	getNodeData(true, "node");
});
// [添加中继] 按钮点击事件处理程序
$("#addEmptyBtn").click(function () {
	getNodeData(false, "empty");
});
// [添加连线说明文字] 按钮点击事件处理程序
$("#addExplainBtn").click(function () {
	getNodeData(true, "explain");
});
// [添加图icon] 按钮点击事件处理程序
$("#addIconBtn").click(function () {
	getNodeData(true, "icon");
});
// [添加备注] 按钮点击事件处理程序
$("#addRemarkBtn").click(function () {
	getNodeData(true, "remark");
});
// 预览模式按钮点击事件处理程序
$("#reviewBtn").click(function () {
	isReview = !isReview;
	$("#container").toggleClass("review");
	setTimeout(() => {
		reload();
	}, 1);
});
// 滚动模式切换
$("#scrollBtn").click(changeScrollDrop);
// 下载
$("#dewnLoad").click(exportPng);

$("#searchBtn").click(function () {
	id = prompt("请输入节点的id：", "1588_724");

	canvas.style.transform = "scale(1)";
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	// 预览模式一定要给一个延时，因为预览模式下位置和缩放是不固定的不好确定位置
	setTimeout(() => {
		findNodeById(id);
	}, 100);
});

function changeScrollDrop() {
	isScroll = !isScroll;
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.style.transform = "scale(1)";
	if (isScroll) {
		container.removeEventListener("wheel", handleWheel);
		container.classList.add("isScroll");
	} else {
		container.addEventListener("wheel", handleWheel, { passive: false });
		container.classList.add("isDrop");
	}
}

// 获取节点传递数据
function getNodeData(requireInput, nodeType) {
	const newNodeId = "node" + Date.now();
	let newNodeLabel = "";
	let typeClass = "";
	let imageSrc = "";

	if (!nodeTypeList.includes(nodeType)) {
		alert("类型不合法");
		return;
	}

	// 确定是否需要输入label标签
	if (requireInput) {
		// 弹出输入框，要求用户输入标签
		newNodeLabel = prompt("请输入节点的标签：", "Node " + (flowchartData.length + 1));
		typeClass = prompt("是否要额外添加一个class？", "Node " + (flowchartData.length + 1));
		if (nodeType === "icon") {
			imageSrc = prompt("请输入图片的文件名及后缀", "coal.png");
		}
		if (newNodeLabel === null) {
			// 用户点击了取消按钮，停止添加节点
			return;
		}
	} else {
		newNodeLabel = nodeType === "empty" ? "" : "Node " + (flowchartData.length + 1);
	}

	var newNode = {
		id: newNodeId,
		top: 0,
		left: 0,
		label: newNodeLabel,
		type: nodeType,
		typeClass: typeClass,
		imageSrc: imageSrc,
	};

	addNode(newNode);
}

// 增加节点的共同方法
/* 
数据结构必须是
{
	id: newNodeId, // 节点的id。必须唯一
	top: 0, // 如果新增节点默认传0，将渲染在当前屏幕中，否则将渲染在指定位置
	left: 0, // 如果新增节点默认传0，将渲染在当前屏幕中，否则将渲染在指定位置
	label: newNodeLabel, // 标签名，没有内容传空字符串不能是undefined
	type: nodeType, // 节点的类型，参考settings.js，可以自定义类型
	typeClass: "", // 给当前元素的一个特殊类名
};
*/
function addNode(node) {
	let newNode = Object.assign({}, node);

	// 保证新增的节点必须在屏幕中间
	// 获取画布的尺寸和位置
	const canvasRect = canvas.getBoundingClientRect();
	// 计算节点位置，保证出现在当前用户的屏幕中
	const newNodeTop = window.scrollY + window.innerHeight / 2 - canvasRect.top;
	const newNodeLeft = window.scrollX + window.innerWidth / 2 - canvasRect.left;
	newNode.top = newNode.top ? newNode.top : newNodeTop;
	newNode.left = newNode.left ? newNode.left : newNodeLeft;

	// 添加新节点到数据列表
	flowchartData.push(newNode);

	// 渲染出来
	addElement(newNode);

	// 更新数据
	window.localStorage.setItem("flowchartData", JSON.stringify(flowchartData));
}
// 渲染节点
async function addElement(newNode) {
	// 判断是否有拖拽事件发生
	let isDragged = false;
	// 双击事件延迟
	const DELAY = 190;
	// 记录点击了几次
	let clicks = 0;
	// 单击事件防抖定时器
	let timer = null;
	// 创建新节点的 DOM 元素并添加到画布
	var newElement = $("<div>")
		.attr("id", newNode.id)
		.attr("node-type", newNode.type)
		.attr("image-src", newNode.imageSrc)
		.attr("type-class", newNode.typeClass)
		.addClass(newNode.type)
		.addClass("node-item")
		.addClass(newNode.typeClass)
		.css({
			top: (newNode.top % 2 === 0 ? newNode.top : newNode.top + 1) + "px",
			left: (newNode.left % 2 === 0 ? newNode.left : newNode.left + 1) + "px",
		})
		.on("mousedown", function (event) {
			isDragged = false;
			startPos = { x: event.clientX, y: event.clientY };
		})
		.on("mousemove", function (event) {
			isDragged = true;
			if (!startPos) return;
			let dx = event.clientX - startPos.x;
			let dy = event.clientY - startPos.y;
			moveElements(dx, dy);
			startPos = { x: event.clientX, y: event.clientY };
		})
		.on("mouseup", function (event) {
			startPos = null;
			if (!isDragged) {
				clicks++; // 计数器
				if (clicks === 1) {
					timer = setTimeout(() => {
						const id = $(this).attr("id");
						const node = $(this).attr("node-type");
						// 预览模式时绑定自定义事件，编辑模式选择当前节点可以键盘上下左右移动
						isReview ? nodeClick(id, node) : changeSelectedNode(newNode);
						// 重置计数器
						clicks = 0;
					}, DELAY);
				} else {
					// 双击事件清除定时器，防止出发单击事件
					clearTimeout(timer);
					// 重置计数器
					clicks = 0;
				}
			}
		});

	if (newNode.type === "icon") {
		newElement.append(
			$("<img>")
				.attr("src", imageBaseUrl + newNode.imageSrc)
				.addClass("node-image")
			// $("<p>").text(newNode.label).addClass("node-label") // 你可能需要定义这个类以设定文字样式
		);
	} else {
		newElement.text(newNode.label);
	}
	// 中继节点隐藏处理
	if (isReview && newNode.type === "empty") {
		newElement.css({
			top: newNode.top + 23 + "px",
			left: newNode.left + 23 + "px",
		});
	}

	// 渲染到页面
	$("#canvas").append(newElement);
	// const thisElement = $('#'+newNode.id)
	// // 让所有节点高度必须为偶数
	// let elementHeight = parseInt(thisElement.outerHeight()); // 获取当前高度
	// console.log("elementHeight", elementHeight);
	// var elementLineHeight = parseInt(thisElement.css("line-height"));
	// if (elementHeight % 2 !== 0) {
	// 	var currentTop = parseInt(thisElement.css("top")) - 1;
	// 	// 如果高度为奇数
	// 	console.log("currentTop", currentTop);
	// 	// thisElement.css("line-height", elementLineHeight + 1 + "px"); // 将高度调整为偶数
	// 	thisElement.css("top", currentTop + 'px');
	// }
	// 绑定双击事件，编辑模式双击为删除事件，预览模式为自定义事件
	if (!isReview) {
		// 绑定双击删除事件
		handledelNode(newElement[0]);
	} else {
		// 绑定双击自定义事件
		handleDblDelNode(newElement[0]);
	}
	// 可拖拽
	if (!isReview) {
		instance.draggable(newElement, {
			containment: "parent",
			// 拖拽步长为10
			grid: [1, 1],
			drag: function (event) {
				changeCanvas(event);
			},
		});
	}

	// 让节点可以自由创建连线
	if (connectableList.includes(newNode.type)) {
		const paintStyle = isReview ? reviewPaintSettings : paintSettings;
		// 使用 addEndpoints 函数添加端点
		instance.addEndpoints(newNode.id, isReview ? [] : endpointOptions, paintStyle);
	}
}
// [导出数据]按钮点击后处理函数
function exportBtnHandle() {
	// 获取所有的节点
	const nodeStr = "." + nodeTypeList.join(",.");
	var nodes = $(nodeStr);
	var flowchartData = getFkowCharData(nodes);

	// 获取所有的连线数据
	var connections = instance.getConnections();
	var connectionData = getConnectionData(connections);

	// 暂时存在本地
	console.log("flowchartData", flowchartData);
	console.log("connectionData", connectionData);
	window.localStorage.setItem("flowchartData", JSON.stringify(flowchartData));
	window.localStorage.setItem("connectionData", JSON.stringify(connectionData));
}

// 获取所有的节点信息，需要传入所有的节点
function getFkowCharData(nodes) {
	let flowchartData = [];
	nodes.each(function () {
		const id = $(this).attr("id");
		const top = parseInt($(this).css("top"));
		const left = parseInt($(this).css("left"));
		const label = $(this).text();
		const type = $(this).attr("node-type");
		const typeClass = $(this).attr("type-class");
		const imageSrc = $(this).attr("image-src");
		flowchartData.push({ id, top, left, label, type, typeClass, imageSrc });
	});
	return flowchartData;
}

// 获取所有的连线数据，需要传入连线信息
function getConnectionData(connections) {
	let connectionData = [];
	var connections = instance.getConnections();
	connections.forEach(function (connection) {
		const sourceId = connection.sourceId;
		const targetId = connection.targetId;
		// 获取源和目标节点的锚点类型
		const sourceAnchorType = connection.endpoints[0].anchor.type;
		const targetAnchorType = connection.endpoints[1].anchor.type;
		// 获取源和目标节点的类型信息
		const sourceNodeType = $("#" + sourceId).attr("node-type");
		const targetNodeType = $("#" + targetId).attr("node-type");

		connectionData.push({
			source: sourceId,
			target: targetId,
			sourceAnchor: sourceAnchorType,
			targetAnchor: targetAnchorType,
			sourceNodeType: sourceNodeType,
			targetNodeType: targetNodeType,
		});
	});
	return connectionData;
}

// 初始化数据的节点
function initNode(flowchartData) {
	isReview ? $("#container").addClass("review") : "";
	// 加载完毕后需要指定canvas宽高
	let canvas = $("#canvas");
	let maxWidth = 0;
	let maxHeight = 0;
	// 遍历创建节点
	flowchartData.forEach(async function (node) {
		addElement(node);
		let $this = $(`#${node.id}`); // 当前子元素
		let width = $this.position().left + $this.outerWidth(); // 子元素最右侧距离 canvas 左边的距离
		let height = $this.position().top + $this.outerHeight(); // 子元素最下方距离 canvas 顶部的距离
		maxWidth = Math.max(maxWidth, width);
		maxHeight = Math.max(maxHeight, height);
	});
	canvas.css({
		width: maxWidth + 100 + "px",
		height: maxHeight + 100 + "px",
	});
}

// 创建连线
function createConnection(connectionData) {
	// 根据起始节点和结束节点类型选择不同的样式
	connectionData.forEach(function (connection) {
		let connectorStyle = connectorStyleDefault;
		// 如果是特殊节点，则加载特殊样式
		if (connectorEmptyStyleList.includes(connection.sourceNodeType)) {
			connectorStyle = connectorStyleSource;
		}

		if (connectorEmptyStyleList.includes(connection.targetNodeType)) {
			connectorStyle = connectorStyleTarget;
		}
		instance.connect({
			source: connection.source,
			target: connection.target,
			anchors: [connection.sourceAnchor, connection.targetAnchor],
			...connectorStyle,
		});
	});
}

// 双击删除连线事件
function connectionDoubleClick() {
	if (isReview) {
		instance.bind("dblclick", function (connection) {
			if (!isReview && confirm("确定要删除连线吗?")) {
				instance.deleteConnection(connection);
			}
		});
	}
}

// 给所有节点双击删除节点事件
function nodeDoubleClick() {
	// 使用你的节点类名替换'.node-class'
	var nodes = document.querySelectorAll(".node-item");
	nodes.forEach(function (node) {
		handledelNode(node);
	});
}
// 删除节点操作
function handledelNode(newElement) {
	newElement.addEventListener("dblclick", function () {
		if (confirm("确定要删除这个节点吗?")) {
			// 删除节点的jsPlumb逻辑
			instance.remove(newElement);
		}
	});
}
// 绑定双击事件
function handleDblDelNode(newElement) {
	newElement.addEventListener("dblclick", function () {
		const id = $(this).attr("id");
		const node = $(this).attr("node-type");
		nodeDblClick(id, node);
	});
}

// 重新渲染
function reload() {
	canvas.style.top = "0px";
	canvas.style.left = "0px";
	canvas.style.transform = "scale(1)";
	$("#canvas").empty(); // 删除所有节点
	instance.deleteEveryEndpoint(); // 删除所有端点和连线
	setTimeout(async () => {
		// 根据数据创建节点
		await initNode(flowchartData);
		// 根据数据创建连线
		createConnection(connectionData);
		// 双击连线删除事件加载
		connectionDoubleClick();
		// 预览模式拖拽和缩放
		initCanvasDraggable();
	}, 1);
}

// 拖拽节点变化画布宽度
function changeCanvas(event) {
	var element = $(event.el);

	var canvasWidth = canvas.offsetWidth;
	var canvasHeight = canvas.offsetHeight;
	var elementPosition = element.position();
	var width = element.width();

	var buffer = 150; // 检查的边缘距离
	var expansion = 300; // 扩展的距离
	if (canvasWidth - elementPosition.left - width < buffer) {
		// 如果元素接近右边缘
		canvas.style.width = canvasWidth + expansion + "px";
	}

	if (canvasHeight - elementPosition.top < buffer) {
		// 如果元素接近底边缘
		canvas.style.height = canvasHeight + expansion + "px";
	}
}

function getCurrentDateTimeString() {
	let now = new Date();
	let year = now.getFullYear();
	let month = (now.getMonth() + 1).toString().padStart(2, "0");
	let day = now.getDate().toString().padStart(2, "0");
	let hour = now.getHours().toString().padStart(2, "0");
	let minute = now.getMinutes().toString().padStart(2, "0");

	return `${year}${month}${day}${hour}${minute}`;
}

// 导出图片
function exportPng() {
	// 不要有太多余白
	canvas.style.minWidth = "max-content";
	canvas.style.minHeight = "max-content";
	html2canvas(canvas, { useCORS: true }).then((canvasData) => {
		let imgData = canvasData.toDataURL("image/png");
		let a = document.createElement("a");
		a.href = imgData;
		a.download = "canvas_" + getCurrentDateTimeString() + ".png";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		canvas.style.minWidth = "100vw";
		canvas.style.minHeight = "100%";
	});
}

// 计算节点的偏移量
function nodeOffset(newNode, newElement) {
	// 获取元素的宽度和高度
	var elementWidth = newElement.width();
	var elementHeight = newElement.height();
	newElement.css({
		top: newNode.top + elementHeight / 2 + "px",
		left: newNode.left + elementWidth / 2 + "px",
	});
	return newElement;
}

// 捕获键盘上下左右事件，上下左右可以移动
document.addEventListener("keydown", function (e) {
	var newPosition;
	if (selectedNode) {
		// 如果有节点被选中
		var nodeElement = $("#" + selectedNode.id);
	} else {
		var nodeElement = $("#canvas");
	}
	console.log("aaaaa", selectedElements);
	switch (e.keyCode) {
		case 37: // 左箭头
			newPosition = {
				left: parseInt(nodeElement.css("left")) - 1,
				top: parseInt(nodeElement.css("top")),
			};
			moveElements(-1, 0);
			e.preventDefault();
			break;
		case 38: // 上箭头
			newPosition = {
				left: parseInt(nodeElement.css("left")),
				top: parseInt(nodeElement.css("top")) - 1,
			};
			moveElements(0, -1);
			e.preventDefault();
			break;
		case 39: // 右箭头
			newPosition = {
				left: parseInt(nodeElement.css("left")) + 1,
				top: parseInt(nodeElement.css("top")),
			};
			moveElements(1, 0);
			e.preventDefault();
			break;
		case 40: // 下箭头
			newPosition = {
				left: parseInt(nodeElement.css("left")),
				top: parseInt(nodeElement.css("top")) + 1,
			};
			moveElements(0, 1);
			e.preventDefault();
			break;
		default:
			return; // 如果按下的不是方向键，则不做任何操作
	}
	if (selectedNode) {
		// 更新节点的位置
		selectedNode.left = newPosition.left;
		selectedNode.top = newPosition.top;
		// 重新设置节点元素的样式
		var nodeElement = $("#" + selectedNode.id);
		nodeElement.css({
			top: newPosition.top + "px",
			left: newPosition.left + "px",
		});
		// 重绘该节点的所有连接
		instance.revalidate(selectedNode.id);
	}
});

function changeSelectedNode(node) {
	if (selectedNode) {
		$("#" + selectedNode.id).removeClass("node-active");
	}
	selectedNode = node;
	$("#" + selectedNode.id).addClass("node-active");
}

function getFileNameFromURL(url) {
	const parts = url.split("/");
	const filename = parts.pop();

	return filename;
}

let scale = 1;
// 是否正在拖拽
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
// 选择框大小
let box = document.getElementById("selection-box");
// 开始节点位置
let start = null;















let handleWheel = function (event) {
	// event.preventDefault();
	// let scaleAmount = 0.2;

	// // 获取鼠标当前位置（相对于视口）
	// let x = event.clientX;
	// let y = event.clientY;

	// // 获取 canvas 的位置
	// let rect = canvas.getBoundingClientRect();

	// // 将鼠标的位置转化为相对于 canvas 的位置
	// let relativeX = x - rect.left;
	// let relativeY = y - rect.top;

	// // 设置缩放中心为鼠标当前位置
	// canvas.style.transformOrigin = `${relativeX}px ${relativeY}px`;

	// if (event.deltaY < 0) {
	// 	scale += scaleAmount;
	// } else {
	// 	scale -= scaleAmount;
	// }
	// const determinedScale = scale < 0.2 ? 0.1 : scale;
	// scale = determinedScale;
	// canvas.style.transform = "scale(" + determinedScale + ")";


	mouseEvent(canvas)
};

let mouseEvent = function (target) {
	/**
	 * 判断传入参数是否是HTML DOM
	 */
	let isElement = (obj) => {
		return typeof HTMLElement === "object" ? obj instanceof HTMLElement : !!(obj && typeof obj === "object" && (obj.nodeType === 1 || obj.nodeType === 9) && typeof obj.nodeName === "string");
	};

	/**
	 * 被拖拽物、被缩放元素
	 */
	let drawEl = target;
	/**
	 * 如果传入参数不是一个HTML DOM，则查找目标元素
	 */
	if (!isElement(target)) {
		drawEl = document.querySelector(target);
	}

	/**
	 * 父元素：容器
	 */
	const parent = drawEl.parentElement;

	/**
	 * 获取父元素的大小及其相对于视口的位置。
	 */
	const parentRect = parent.getBoundingClientRect();

	/**
	 * 鼠标相对于目标物缩放点的距离
	 */
	let diffX = 0,
		diffY = 0;

	/**
	 * 是否正在拖拽
	 */
	let isDrawing = false;

	/**
	 * 鼠标当前相对于父容器的坐标
	 */
	let mouseX = 0,
		mouseY = 0;

	/**
	 * 偏移坐标，缩放比例
	 */
	let translateX = 0,
		translateY = 0;
	let scale = 1;

	/**
	 * 一次缩放的比例
	 */
	const diff = 0.01;

	/**
	 * 滚轮滚动方向是否向上
	 * 向上,缩小
	 * 向下，放大
	 */
	let isUpward = false;

	/**
	 * 刷新鼠标距离目标元素缩放点的距离
	 */
	let refreshMousePositionDiffValue = () => {
		diffX = mouseX - translateX;
		diffY = mouseY - translateY;
	};

	/**
	 * 更新样式
	 */
	let refreshTargetStyle = () => {
		drawEl.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
		parent.style.cursor = isDrawing ? "move" : "default";
	};

	/**
	 * 鼠标移动事件
	 */
	parent.addEventListener("mousemove", (e) => {
		mouseX = e.x - parentRect.left;
		mouseY = e.y - parentRect.top;

		if (isDrawing) {
			translateX = mouseX - diffX;
			translateY = mouseY - diffY;

			refreshTargetStyle();
		}
	});

	/**
	 * 鼠标按下事件
	 */
	parent.addEventListener("mousedown", () => {
		refreshMousePositionDiffValue();
		isDrawing = true;
		refreshTargetStyle();
	});

	/**
	 * 鼠标抬起事件
	 */
	window.addEventListener("mouseup", () => {
		isDrawing = false;
		refreshTargetStyle();
	});

	/**
	 * 鼠标滚动事件
	 */

	let mouseZoom = (e) => {
		e = e || window.event;

		if (e.wheelDelta) {
			isUpward = e.wheelDelta > 0;
		} else if (e.detail) {
			isUpward = e.detail < 0;
		}

		let oldWidth = scale * drawEl.clientWidth;
		let oldHeight = scale * drawEl.clientHeight;

		if (isUpward) {
			scale += diff;
		} else if (!isUpward && scale > 0.05) {
			scale -= diff;
		}

		let newWidth = scale * drawEl.clientWidth;
		let newHeight = scale * drawEl.clientHeight;

		//刷新鼠标距离目标元素缩放点坐标
		refreshMousePositionDiffValue();

		/**
		 * 重新计算缩放偏移量
		 */
		translateX -= (newWidth - oldWidth) * (diffX / oldWidth);
		translateY -= (newHeight - oldHeight) * (diffY / oldHeight);

		refreshTargetStyle();
	};

	/**
	 * 鼠标滚轮兼容
	 */

	/*IE、Opera注册事件*/
	// if (document.attachEvent) {
	// 	parent.attachEvent("onmousewheel", mouseZoom);
	// }
	// //Firefox使用addEventListener添加滚轮事件
	// if (document.addEventListener) {
	// 	parent.addEventListener("DOMMouseScroll", mouseZoom, false);
	// }
	//Safari与Chrome属于同一类型
	// window.onmousewheel = parent.onmousewheel = mouseZoom;

	/**
	 * 页面初始化
	 */

	/**
	 * 判断缩放元素高度是否高于容器高度
	 * 如果大于，则缩放值容器高度
	 */
	if (drawEl.clientHeight > parent.clientHeight) {
		scale = 1 - (drawEl.clientHeight - parent.clientHeight) / drawEl.clientHeight;
	}

	/**
	 * 让目标元素居中显示
	 */
	translateX = (parent.clientWidth - scale * drawEl.clientWidth) / 2;
	translateY = (parent.clientHeight - scale * drawEl.clientHeight) / 2;

	//设置初始样式
	drawEl.style.transformOrigin = "0 0";

	/**
	 * 当目标元素 是img时，需要禁用元素鼠标可拖拽
	 * div user-drag 默认是none 可以不设置
	 */
	drawEl.style.userDrag = "none";
	drawEl.style.webkitUserDrag = "none";

	//禁用选则，防止拖拽时出现先择元素内部元素的情况
	drawEl.style.userSelect = "none";

	refreshTargetStyle();
};













let handleMouseDown = function (event) {
	isDragging = true;
	previousMousePosition = { x: event.clientX, y: event.clientY };
	container.style.cursor = "grabbing";
};

let handleMouseMove = function (event) {
	if (isDragging) {
		let dx = event.clientX - previousMousePosition.x;
		let dy = event.clientY - previousMousePosition.y;

		let currentTop = parseInt(canvas.style.top || "0");
		let currentLeft = parseInt(canvas.style.left || "0");

		canvas.style.top = currentTop + dy + "px";
		canvas.style.left = currentLeft + dx + "px";

		previousMousePosition = { x: event.clientX, y: event.clientY };
	}
};

let handleMouseUp = function (event) {
	if (isDragging) {
		isDragging = false;
		container.style.cursor = "default";
	}
};

let handleCanvasMousedown = function (event) {
	// 重置选择框
	box.style.display = "none";
	start = { x: event.clientX, y: event.clientY };
	box.style.left = start.x + "px";
	box.style.top = start.y + "px";
	box.style.width = "0px";
	box.style.height = "0px";
	box.style.display = "block";
};

let handleCanvasMousemove = function (event) {
	if (!start) return;
	let x = Math.min(event.clientX, start.x);
	let y = Math.min(event.clientY, start.y);
	let width = Math.abs(event.clientX - start.x);
	let height = Math.abs(event.clientY - start.y);
	box.style.left = x + "px";
	box.style.top = y + "px";
	box.style.width = width + "px";
	box.style.height = height + "px";
};

let handleCanvasMouseup = function (event) {
	// 选择框的边界
	let boxBounds = box.getBoundingClientRect();
	// 获取页面上的所有元素
	let elements = canvas.getElementsByTagName("*");
	selectedElements = [];
	// 遍历所有元素
	for (let i = 0; i < elements.length; i++) {
		// 获取元素的边界
		let elementBounds = elements[i].getBoundingClientRect();
		elements[i].classList.remove("node-active");

		// 检查元素是否在选择框内
		if (elementBounds.left >= boxBounds.left && elementBounds.right <= boxBounds.right && elementBounds.top >= boxBounds.top && elementBounds.bottom <= boxBounds.bottom) {
			if (elements[i].hasAttribute("node-type")) {
				elements[i].classList.add("node-active");
				selectedElements.push(elements[i]);
			}
		}
	}
	start = null;
};
// 让画布可拖拽可放大缩小
function initCanvasDraggable() {
	if (isReview) {
		box.style.display = "none";
		container.addEventListener("wheel", handleWheel, { passive: false });
		container.addEventListener("mousedown", handleMouseDown);
		container.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
		canvas.removeEventListener("mousedown", handleCanvasMousedown);
		canvas.removeEventListener("mousemove", handleCanvasMousemove);
		canvas.removeEventListener("mouseup", handleCanvasMouseup);
	} else {
		container.removeEventListener("wheel", handleWheel);
		container.removeEventListener("mousedown", handleMouseDown);
		container.removeEventListener("mousemove", handleMouseMove);
		window.removeEventListener("mouseup", handleMouseUp);
		canvas.style.top = "0px";
		canvas.style.left = "0px";
		canvas.style.transform = "scale(1)";
		canvas.addEventListener("mousedown", handleCanvasMousedown);
		canvas.addEventListener("mousemove", handleCanvasMousemove);
		canvas.addEventListener("mouseup", handleCanvasMouseup);
	}
}

// 防抖公共方法
function debounce(func, delay) {
	let debounceTimer;
	return function (...args) {
		const context = this;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			func.apply(context, args);
		}, delay);
	};
}
// 移动已经倍选择的节点
function moveElements(dx, dy) {
	selectedElements.forEach((element) => {
		let currentTop = parseInt(getComputedStyle(element).top, 10);
		let currentLeft = parseInt(getComputedStyle(element).left, 10);
		element.style.top = currentTop + dy + "px";
		element.style.left = currentLeft + dx + "px";
		function createNodeRevalidate(elementid) {
			instance.revalidate(elementid);
		}
		// 防抖处理
		let moveElementsDebounced = debounce(createNodeRevalidate, 100);
		// 重新渲染连线防抖,如果想实时渲染的话，只需要直接调用createNodeRevalidate就可以了
		// createNodeRevalidate(element.id);
		// 实时渲染选择节点太多可能会卡顿，所以用防抖
		moveElementsDebounced(element.id);
	});
}

let searchNode = null;
let timeoutId = null;
function findNodeById(id) {
	if (searchNode) {
		searchNode.classList.remove("searched-node");
	}
	// 用心的覆盖原来的
	searchNode = document.getElementById(id);
	if (!searchNode) {
		alert(`请确认是否有ID为【${id}】的节点`);
		return false;
	}
	changeAnimationColor(searchNode);
	if (searchNode) {
		searchNode.scrollIntoView({ block: "center", inline: "nearest" });
		searchNode.classList.add("searched-node");
	}
	timeoutId ? clearTimeout(timeoutId) : "";
	timeoutId = setTimeout(function () {
		searchNode.classList.remove("searched-node");
	}, 8000);
}
// 计算反差色
function getContrastColor(element) {
	console.log(element);
	let bgColor = getComputedStyle(element).getPropertyValue("background-color");
	let bdColor = getComputedStyle(element).getPropertyValue("border-color");
	let match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d+))?\)/);
	let match2 = bdColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d+))?\)/) || match;
	let [, r1, g1, b1] = match.map(Number);
	let [, r2, g2, b2] = match2.map(Number);
	let contrastR = 0;
	let contrastG = 0;
	let contrastB = 0;
	if (r1 > 240 && g1 > 240 && b1 > 240) {
		contrastR = 255 - r2;
		contrastG = 255 - g2;
		contrastB = 255 - b2;
	} else if (r2 > 240 && g2 > 240 && b2 > 240) {
		contrastR = 255;
		contrastG = 175;
		contrastB = 0;
	} else {
		contrastR = 255 - r1;
		contrastG = 255 - g1;
		contrastB = 255 - b1;
	}
	return { contrastR, contrastG, contrastB };
}

// 根据反差色插入动画
function changeAnimationColor(element) {
	let { contrastR, contrastG, contrastB } = getContrastColor(element);
	let bgColor = getComputedStyle(element).getPropertyValue("background-color");
	let style = document.createElement("style");

	// 定义动画内容
	style.innerHTML = `
		@keyframes shadow-pulse {
			0% {
			box-shadow: 0 0 0 10px rgba(${contrastR}, ${contrastG}, ${contrastB}, 0.8);
			background-color: rgba(${contrastR}, ${contrastG}, ${contrastB}, 0.8);

			}
			50% {
			box-shadow: 0 0 20px 20px rgba(${contrastR}, ${contrastG}, ${contrastB}, 0.5);
			background-color: rgba(${contrastR}, ${contrastG}, ${contrastB}, 0.5);
			}
			100% {
			box-shadow: 0 0 0 30px rgba(0,0,0,0); 
			background-color: ${bgColor};
			}
		}
    `;
	document.head.appendChild(style);
}

// 点击节点的公共处理函数
function nodeClick(id, node) {
	alert("单机事件：id:" + id + " - " + "node:" + node);
}
// 双击节点的公共处理函数
function nodeDblClick(id, node) {
	alert("双击事件：id:" + id + " - " + "node:" + node);
}
