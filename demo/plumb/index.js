const flowchartData = JSON.parse(window.localStorage.getItem("flowchartData")) || flowchartDataDefault;
const connectionData = JSON.parse(window.localStorage.getItem("connectionData")) || connectionDataDefault;
// 被选择的节点
let selectedNode = null;
// 创建实例
const instance = jsPlumb.getInstance();

// 初始化流程图
jsPlumb.ready(function () {
	// 根据数据创建节点
	initNode(flowchartData);
	// 根据数据创建连线
	createConnection(connectionData);
	// 双击连线删除事件加载
	connectionDoubleClick();
	// 双击删除节点事件绑定
	// nodeDoubleClick()
});

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
	$("#canvas").toggleClass("review");
	setTimeout(() => {
		reload();
	}, 1);
});
// 下载
$("#dewnLoad").click(function () {
	console.log(html2canvas)
	html2canvas(document.getElementById('canvas'), { useCORS: true }).then(canvas => {
		console.log(canvas)
		let imgData = canvas.toDataURL('image/png');
		let a = document.createElement('a');
		a.href = imgData;
		a.download = 'canvas.png';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	});
});

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
	const canvas = document.getElementById("canvas");
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
function addElement(newNode) {
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
			top: newNode.top + "px",
			left: newNode.left + "px",
		})
		.on("mousedown", function () {
			isDragged = false;
		})
		.on("mousemove", function () {
			isDragged = true;
		})
		.on("mouseup", function () {
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
				.addClass("node-image"),
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
		instance.addEndpoints(newNode.id, endpointOptions, paintStyle);
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
	// 加载完毕后需要指定canvas宽高
	let canvas = $("#canvas");
	let maxWidth = 0;
	let maxHeight = 0;
	// 遍历创建节点
	flowchartData.forEach(function (node) {
		addElement(node);
		let $this = $(`#${node.id}`); // 当前子元素
		let width = $this.position().left + $this.outerWidth(); // 子元素最右侧距离 canvas 左边的距离
		let height = $this.position().top + $this.outerHeight(); // 子元素最下方距离 canvas 顶部的距离

		maxWidth = Math.max(maxWidth, width);
		maxHeight = Math.max(maxHeight, height);
	});
	canvas.css({
		width: maxWidth + 300 + "px",
		height: maxHeight + 300 + "px",
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
	instance.bind("dblclick", function (connection) {
		if (!isReview && confirm("确定要删除连线吗?")) {
			instance.deleteConnection(connection);
		}
	});
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
	instance.deleteEveryEndpoint(); // 删除所有端点和连线
	$("#canvas").empty(); // 删除所有节点
	// 根据数据创建节点
	initNode(flowchartData);
	// 根据数据创建连线
	createConnection(connectionData);
}

// 拖拽节点变化画布宽度
function changeCanvas(event) {
	var element = $(event.el);
	var canvas = document.getElementById("canvas");

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
	if (selectedNode) {
		// 如果有节点被选中
		var newPosition;
		var nodeElement = $("#" + selectedNode.id);
		switch (e.keyCode) {
			case 37: // 左箭头
				newPosition = {
					left: parseInt(nodeElement.css("left")) - 1,
					top: parseInt(nodeElement.css("top")),
				};
				e.preventDefault();
				break;
			case 38: // 上箭头
				newPosition = {
					left: parseInt(nodeElement.css("left")),
					top: parseInt(nodeElement.css("top")) - 1,
				};
				e.preventDefault();
				break;
			case 39: // 右箭头
				newPosition = {
					left: parseInt(nodeElement.css("left")) + 1,
					top: parseInt(nodeElement.css("top")),
				};
				e.preventDefault();
				break;
			case 40: // 下箭头
				newPosition = {
					left: parseInt(nodeElement.css("left")),
					top: parseInt(nodeElement.css("top")) + 1,
				};
				e.preventDefault();
				break;
			default:
				return; // 如果按下的不是方向键，则不做任何操作
		}
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

// 点击节点的公共处理函数
function nodeClick(id, node) {
	alert("单机事件：id:" + id + " - " + "node:" + node);
}
// 双击节点的公共处理函数
function nodeDblClick(id, node) {
	alert("双击事件：id:" + id + " - " + "node:" + node);
}
