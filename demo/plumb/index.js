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
	nodeDoubleClick()
});

// 导出数据按钮点击事件处理程序
$("#exportBtn").click(function () {
	exportBtnHandle(instance);
});

// [添加节点] 按钮点击事件处理程序
$("#addNodeBtn").click(function () {
	addNode(true, 'node')
});
// [添加中继] 按钮点击事件处理程序
$("#addEmptyBtn").click(function () {
	addNode(false, 'empty')
});
// [添加连线说明文字] 按钮点击事件处理程序
$("#addExplainBtn").click(function () {
	addNode(true, 'explain')
});
// [添加图icon] 按钮点击事件处理程序
$("#addIconBtn").click(function () {
	addNode(true, 'icon')
});
// [添加备注] 按钮点击事件处理程序
$("#addRemarkBtn").click(function () {
	addNode(true, 'remark')
});
// 预览模式按钮点击事件处理程序
$("#reviewBtn").click(function () {
	$('#canvas').toggleClass('review');
	setTimeout(() => {
		reload()
	}, 1);
});

// 增加节点的共同方法
function addNode(requireInput, nodeType) {
	const newNodeId = "node" + (flowchartData.length + 1);
	let newNodeLabel = ""

	if (!nodeTypeList.includes(nodeType)) {
		alert("类型不合法");
		return
	}
	// 确定是否需要输入label标签
	if (requireInput) {
		// 弹出输入框，要求用户输入标签
		newNodeLabel = prompt("请输入节点的标签：", "Node " + (flowchartData.length + 1));
		if (newNodeLabel === null) {
			// 用户点击了取消按钮，停止添加节点
			return;
		}
	} else {
		newNodeLabel = nodeType === 'empty' ? '' : "Node " + (flowchartData.length + 1)
	}
	// 没有id代表是要创建新元素
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
	addElement(newNode)

	// 更新数据
	window.localStorage.setItem("flowchartData", JSON.stringify(flowchartData));
}


// 渲染节点
function addElement(newNode) {
	// 创建新节点的 DOM 元素并添加到画布
	var newElement = $("<div>")
		.attr("id", newNode.id)
		.attr("node-type", newNode.type)
		.addClass(newNode.type)
		.addClass('node-item')
		.css({
			top: newNode.top + "px",
			left: newNode.left + "px",
		})
		.text(newNode.label);
	$("#canvas").append(newElement);
	// 绑定删除事件
	delNode(newElement[0])
	// 可拖拽
	instance.draggable(newElement, {
		containment: "parent",
	});

	// 让节点可以自由创建连线
	if (connectableList.includes(newNode.type)) {
		// 使用 addEndpoints 函数添加端点
		instance.addEndpoints(
			newNode.id,
			endpointOptions,
			paintSettings
		);
	}
	// // 设置好连线后不可以再次拖拽
	// jsPlumb.importDefaults({
	// 	ConnectionsDetachable: false,
	// });
}


// [导出数据]按钮点击后处理函数
function exportBtnHandle() {
	// 获取所有的节点
	const nodeStr = '.' + nodeTypeList.join(',.')
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
	connections.forEach(function (connection) {
		const sourceId = connection.sourceId;
		const targetId = connection.targetId;
		// 获取源和目标节点的锚点类型
		const sourceAnchorType = connection.endpoints[0].anchor.type;
		const targetAnchorType = connection.endpoints[1].anchor.type;

		connectionData.push({ source: sourceId, target: targetId, sourceAnchor: sourceAnchorType, targetAnchor: targetAnchorType });
	});
	return connectionData;
}

// 初始化数据的节点
function initNode(flowchartData) {
	// 遍历创建节点
	flowchartData.forEach(function (node) {
		addElement(node)
	});
}

// 创建连线
function createConnection(connectionData) {
	connectionData.forEach(function (connection) {
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

// 双击删除节点事件
function nodeDoubleClick() {
	// 使用你的节点类名替换'.node-class'
	var nodes = document.querySelectorAll('.node-item');
	nodes.forEach(function (node) {
		delNode(node)
	});
}
// 删除节点操作
function delNode(node){
	node.addEventListener('dblclick', function () {
		if (confirm("确定要删除这个节点吗?")) {
			// 删除节点的jsPlumb逻辑
			instance.remove(node);
			// 给出提示
			// alert('节点已删除');
		}
	});
}

// 重新渲染
function reload(){
	instance.deleteEveryEndpoint();  // 删除所有端点和连线
	$('#canvas').empty();  // 删除所有节点
	// 根据数据创建节点
	initNode(flowchartData);
	// 根据数据创建连线
	createConnection(connectionData);
}