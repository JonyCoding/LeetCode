// 连接关系数据
var connectionDataDefault = [
    { "source": "node11", "target": "node14", "sourceAnchor": "Right", "targetAnchor": "Left" },
    { "source": "node11", "target": "node15", "sourceAnchor": "Top", "targetAnchor": "Left" },
    { "source": "node15", "target": "node13", "sourceAnchor": "Right", "targetAnchor": "Left" },
    { "source": "node15", "target": "node12", "sourceAnchor": "Top", "targetAnchor": "Left" },
    { "source": "node14", "target": "node16", "sourceAnchor": "Right", "targetAnchor": "Left" },
    { "source": "node13", "target": "node16", "sourceAnchor": "Right", "targetAnchor": "Top" }];
// 流程图数据
var flowchartDataDefault = [
    {
      "source": "node14",
      "target": "node16",
      "sourceAnchor": "Right",
      "targetAnchor": "Left",
      "sourceNodeType": "node",
      "targetNodeType": "node"
    },
    {
      "source": "node11",
      "target": "node14",
      "sourceAnchor": "Right",
      "targetAnchor": "Left",
      "sourceNodeType": "node",
      "targetNodeType": "node"
    },
    {
      "source": "node11",
      "target": "node15",
      "sourceAnchor": "Top",
      "targetAnchor": "Left",
      "sourceNodeType": "node",
      "targetNodeType": "empty"
    },
    {
      "source": "node15",
      "target": "node13",
      "sourceAnchor": "Right",
      "targetAnchor": "Left",
      "sourceNodeType": "empty",
      "targetNodeType": "node"
    },
    {
      "source": "node15",
      "target": "node12",
      "sourceAnchor": "Top",
      "targetAnchor": "Left",
      "sourceNodeType": "empty",
      "targetNodeType": "node"
    },
    {
      "source": "node1686230540818",
      "target": "node1686230474807",
      "sourceAnchor": "Right",
      "targetAnchor": "Left",
      "sourceNodeType": "node",
      "targetNodeType": "node"
    },
    {
      "source": "node13",
      "target": "node17",
      "sourceAnchor": "Right",
      "targetAnchor": "Left",
      "sourceNodeType": "node",
      "targetNodeType": "explain"
    },
    {
      "source": "node17",
      "target": "node16",
      "sourceAnchor": "Right",
      "targetAnchor": "Top",
      "sourceNodeType": "explain",
      "targetNodeType": "node"
    }
  ];
