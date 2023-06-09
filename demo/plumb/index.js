const flowchartData = JSON.parse(window.localStorage.getItem("flowchartData")) || flowchartDataDefault;
const connectionData = JSON.parse(window.localStorage.getItem("connectionData")) || connectionDataDefault;

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
	addNode(true, "node");
});
// [添加中继] 按钮点击事件处理程序
$("#addEmptyBtn").click(function () {
	addNode(false, "empty");
});
// [添加连线说明文字] 按钮点击事件处理程序
$("#addExplainBtn").click(function () {
	addNode(true, "explain");
});
// [添加图icon] 按钮点击事件处理程序
$("#addIconBtn").click(function () {
	addNode(true, "icon");
});
// [添加备注] 按钮点击事件处理程序
$("#addRemarkBtn").click(function () {
	addNode(true, "remark");
});
// 预览模式按钮点击事件处理程序
$("#reviewBtn").click(function () {
	isReview = !isReview;
	$("#canvas").toggleClass("review");
	setTimeout(() => {
		reload();
	}, 1);
});

// 增加节点的共同方法
function addNode(requireInput, nodeType) {
	const newNodeId = "node" + Date.now();
	let newNodeLabel = "";
	let newNodeColor = "red";

	if (!nodeTypeList.includes(nodeType)) {
		alert("类型不合法");
		return;
	}
	// 确定是否需要输入label标签
	if (requireInput) {
		// 弹出输入框，要求用户输入标签
		newNodeLabel = prompt("请输入节点的标签：", "Node " + (flowchartData.length + 1));
		newNodeColor = prompt("请输入节点的颜色色号，默认是红色：", "red");
		if (newNodeColor === null) {
			console.log("");
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
		top: 150,
		left: 400,
		label: newNodeLabel,
		type: nodeType,
	};
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
	const DELAY = 260;
	// 记录点击了几次
	let clicks = 0;
	// 单击事件防抖定时器
	let timer = null;
	// 创建新节点的 DOM 元素并添加到画布
	var newElement = $("<div>")
		.attr("id", newNode.id)
		.attr("node-type", newNode.type)
		.addClass(newNode.type)
		.addClass("node-item")
		.css({
			top: newNode.top + "px",
			left: newNode.left + "px",
		})
		.text(newNode.label)
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
						// 预览模式时才触发单击事件
						isReview ? nodeClick(id, node) : "";
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
	// 中继节点隐藏处理
	if (isReview && newNode.type === "empty") {
		newElement.css({
			top: newNode.top + 22 + "px",
			left: newNode.left + 22 + "px",
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
		handleDblDelNode(newElement[0])
	}
	// 可拖拽
	if (!isReview) {
		instance.draggable(newElement, {
			containment: "parent",
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
		flowchartData.push({ id: id, top: top, left: left, label: label, type: type });
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
	// 遍历创建节点
	flowchartData.forEach(function (node) {
		addElement(node);
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
		if (confirm("确定要删除连线吗?")) {
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

// 点击节点的公共处理函数
function nodeClick(id, node) {
	alert("单机事件：id:" + id + " - " + "node:" + node);
}
// 双击节点的公共处理函数
function nodeDblClick(id, node) {
	alert("双击事件：id:" + id + " - " + "node:" + node);
}
