const flowchartData = JSON.parse(window.localStorage.getItem("flowchartData")) || connectionDataDefault;

const connectionData = JSON.parse(window.localStorage.getItem("connectionData")) || flowchartDataDefault;



// 设置连接线样式
const connectorStyle = {
    strokeWidth: 2,
    stroke: "#555555",
    connector: ["Flowchart", { stub: 20 }],
    connectorEditable: true,
};
// 初始化流程图
jsPlumb.ready(function () {
    // 创建实例
    var instance = jsPlumb.getInstance();

    // 导出数据按钮点击事件处理程序
    $("#exportBtn").click(function () {
        exportBtnHandle(instance)
    });
    // 创建节点
    createNode(instance, flowchartData);
    // 创建连接
    createConnection(instance, connectionData);
    // 双击连线删除事件加载
    connectionDoubleClick(instance);
});

// 添加节点按钮点击事件处理程序
$("#addNodeBtn").click(function () {
    var newNodeId = "node" + (flowchartData.length + 1);
    var newNode = {
        id: newNodeId,
        top: 150,
        left: 400,
        label: "Node " + (flowchartData.length + 1),
    };

    // 添加新节点到数据列表
    flowchartData.push(newNode);

    // 创建新节点的 DOM 元素并添加到画布
    var newElement = $("<div>")
        .attr("id", newNode.id)
        .addClass("node")
        .css({
            top: newNode.top + "px",
            left: newNode.left + "px",
        })
        .text(newNode.label);
    $("#canvas").append(newElement);

    // 可拖拽
    instance.draggable(newElement, {
        containment: "parent",
    });

    // 更新数据
    window.localStorage.setItem("flowchartData", JSON.stringify(flowchartData));
});

// 导出按钮点击后处理函数，需要接受instance实例
function exportBtnHandle(instance) {
    // 获取所有的节点
    var nodes = $(".node,.explain,.empty");
    var flowchartData = getFkowCharData(nodes);

    // 获取所有的连线数据
    var connections = instance.getConnections();
    var connectionData = getConnectionData(connections)


    // 暂时存在本地
    console.log("flowchartData", flowchartData);
    console.log("connectionData", connectionData);
    window.localStorage.setItem("flowchartData", JSON.stringify(flowchartData));
    window.localStorage.setItem("connectionData", JSON.stringify(connectionData));
}


// 获取所有的节点信息，需要传入所有的节点
function getFkowCharData(nodes) {
    let flowchartData = []
    nodes.each(function () {
        const id = $(this).attr("id");
        const top = parseInt($(this).css("top"));
        const left = parseInt($(this).css("left"));
        const label = $(this).text();
        const type = $(this).attr("node-type");
        flowchartData.push({ id: id, top: top, left: left, label: label, type: type });
    });
    return flowchartData
}

// 获取所有的连线，需要传入连线信息

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
    return connectionData
}

// 创建节点处理程序
function createNode(instance, flowchartData) {
    console.log('', instance, flowchartData)
    // 创建节点
    flowchartData.forEach(function (node) {
        var element = $("<div>")
            .attr("id", node.id)
            .attr("node-type", node.type)
            .addClass(node.type)
            .css({
                top: node.top + "px",
                left: node.left + "px",
            })
            .text(node.label);
        $("#canvas").append(element);
        // 可拖拽
        instance.draggable(element, {
            containment: "parent",
        });

        //自由创建连线

        var paintSettings = {
            isSource: true,
            isTarget: true,
            connector: ["Flowchart"],
            endpoint: "Dot",
            maxConnections: -1, // 设置为 -1 表示无连接数上限
            paintStyle: { fill: "#666666", radius: 7 }, // 端点的样式
            hoverPaintStyle: { fill: "#FF0000" }, // 端点悬停时的样式
            connectorStyle: { stroke: "#666666", strokeWidth: 2 }, // 连接线的样式
        };
        if (node.type === "node" || node.type === "empty") {
            // 使用 addEndpoints 函数添加端点
            instance.addEndpoints(
                node.id,
                [
                    { anchor: "Top", uuid: "nodeIdTopCenter" },
                    { anchor: "Bottom", uuid: "nodeIdBottomCenter" },
                    { anchor: "Left", uuid: "nodeIdLeftMiddle" },
                    { anchor: "Right", uuid: "nodeIdRightMiddle" },
                ],
                paintSettings
            );
        }
        // 设置好连线后不可以再次拖拽
        jsPlumb.importDefaults({
            ConnectionsDetachable: false,
        });
    });
}

function createConnection(instance, connectionData) {
    connectionData.forEach(function (connection) {
        instance.connect({
            source: connection.source,
            target: connection.target,
            anchors: [connection.sourceAnchor, connection.targetAnchor],
            endpoint: "Dot",
            connector: ["Flowchart", { stub: 20 }],
            paintStyle: connectorStyle,
        });
    });

}

// 连线双击删除事件
function connectionDoubleClick(instance){
    instance.bind("dblclick", function (connection) {
        if (confirm("确定要删除连线吗?")) {
            instance.deleteConnection(connection);
        }
    });
}