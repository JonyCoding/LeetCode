var DatabaseStatistics = {
	checkDataList:[]
}

//数据库下目录控制
DatabaseStatistics.contentsListControl = function(obj) {
	//1：判断子集是否存在；2：判断展开状态
	if ($(obj).parent(".data_tree_node").parent(".data_tree_node_all").children(".contents_data_node_list").length == 0) {
		var formData = new FormData();
		formData.append("listTableName", $(obj).attr("listTableName"));
		$.ajax({
			async: false,
			url: "/databaseStatistics/selectContentsList",
			type: "POST",
			data: formData,
			contentType: false,
			processData: false,
			success: function(contentsList){
				//将数据库节点的展开状态设置为“1”
				$(obj).attr("deploymentStatus","1");
				var contentsListHtml = '<div class="contents_data_node_list">';
				$.each(contentsList, function (i, n) {
					contentsListHtml = contentsListHtml + '<div class="contents_data_node_all"><div class="contents_data_node">'
						+ '<div class="contents_data_toggle" contentsNumber="' + n.contentsNumber + '" viewTableName="' + $(obj).attr("viewTableName") + '" deploymentStatus="0" onclick="DatabaseStatistics.targetListControl(this)">+</div>'
						+ '<div class="contents_data_title">' + n.contentsName + '</div>'
						+ '</div>'
						+ '</div>';
				});
				contentsListHtml = contentsListHtml + '</div>';
				$(obj).parent(".data_tree_node").parent(".data_tree_node_all").append(contentsListHtml);
			}
		});
	} else {
		if ($(obj).attr("deploymentStatus") == "1") {
			$(obj).attr("deploymentStatus","0");
			$(obj).parent(".data_tree_node").parent(".data_tree_node_all").children(".contents_data_node_list").css("display","none");
		} else {
			$(obj).attr("deploymentStatus","1");
			$(obj).parent(".data_tree_node").parent(".data_tree_node_all").children(".contents_data_node_list").css("display","block");
		}
	}
}

//目录下指标控制
DatabaseStatistics.targetListControl = function(obj) {
	//1：判断子集是否存在；2：判断展开状态
	if ($(obj).parent(".contents_data_node").parent(".contents_data_node_all").children(".target_data_node_list").length == 0) {
		var formData = new FormData();
		formData.append("viewTableName", $(obj).attr("viewTableName"));
		formData.append("contentsNumber", $(obj).attr("contentsNumber"));
		$.ajax({
			async: false,
			url: "/databaseStatistics/selectViewList",
			type: "POST",
			data: formData,
			contentType: false,
			processData: false,
			success: function(contentsList){
				//将数据库节点的展开状态设置为“1”
				$(obj).attr("deploymentStatus","1");
				var contentsListHtml = '<div class="target_data_node_list">';
				$.each(contentsList, function (i, n) {
					contentsListHtml = contentsListHtml + '<div class="target_data_node">'
						+ '<div class="target_data_toggle"><input type="checkbox"></div>'
						+ '<div class="target_data_title">' + n.viewName + '</div>'
						+ '</div>';
				});
				contentsListHtml = contentsListHtml + '</div>';
				$(obj).parent(".contents_data_node").parent(".contents_data_node_all").append(contentsListHtml);
				//引入拖拽
				var sortable = Sortable.create($(obj).parent(".contents_data_node").parent(".contents_data_node_all").children(".target_data_node_list")[0], {
                    group: {
                        name: 'shared',
                        pull: 'clone',
                        put: false // 不允许拖拽进这个列表
                    },
                    animation: 150,
                    sort: false, // 设为false，禁止sort
                    filter: ".target_data_node_seal",  // 过滤.not-sort的元素
                });
//				$(".target_data_node").addClass("target_data_node_seal");
//				$(".target_data_node").removeClass("target_data_node");
			}
		});
	} else {
		if ($(obj).attr("deploymentStatus") == "1") {
			$(obj).attr("deploymentStatus","0");
			$(obj).parent(".contents_data_node").parent(".contents_data_node_all").children(".target_data_node_list").css("display","none");
		} else {
			$(obj).attr("deploymentStatus","1");
			$(obj).parent(".contents_data_node").parent(".contents_data_node_all").children(".target_data_node_list").css("display","block");
		}
	}
}

$(function () {
	var windowWidth = window.screen.availWidth;
	var windowHeight = window.screen.availHeight;
	var leftWidth = (windowWidth - 10) / 2;
	var rightWidth = (windowWidth - 10) / 2;
	$(".presentation_content").css("height", windowHeight - 270);
	$(".target_content").css("width", leftWidth);
	$(".data_template").css("width", rightWidth);
	
	//拖拽中间div控制两边div大小
	var box = document.getElementsByClassName("width_adjustment")[0]; //获取元素
    var x, y, moveX; //鼠标相对与div左边，上边的偏移
    var isDrop = false; //移动状态的判断鼠标按下才能移动
    box.onmousedown = function(e) {
        var e = e || window.event; //要用event这个对象来获取鼠标的位置
        x = e.clientX;
//        x = e.clientX - box.offsetLeft;
//        y = e.clientY - box.offsetTop;
        isDrop = true; //设为true表示可以移动
    }
    document.onmousemove = function(e) {
        //是否为可移动状态                　　　　　　　　　　　 　　　　　　　
        if(isDrop) {　　　　
            var e = e || window.event;                    　　
            moveX = e.clientX - x; //得到距离左边移动距离                    　　
            console.log(moveX)
//            var moveY = e.clientY - y; //得到距离上边移动距离
//            //可移动最大距离
//            var maxX = document.documentElement.clientWidth - box.offsetWidth;
//            var maxY = document.documentElement.clientHeight - box.offsetHeight;
//            //范围限定  当移动的距离最小时取最大  移动的距离最大时取最小
//            //范围限定方法一
//            /*if(moveX < 0) {
//                moveX = 0
//            } else if(moveX > maxX) {
//                moveX = maxX;
//            }
//
//            if(moveY < 0) {
//                moveY = 0;
//            } else if(moveY > maxY) {
//                moveY = maxY;
//            }　*/
//            //范围限定方法二　
//            moveX=Math.min(maxX, Math.max(0,moveX));
//            moveY=Math.min(maxY, Math.max(0,moveY));
//            box.style.left = moveX + "px";　　
//            box.style.top = moveY + "px";　　　　　　　　　　
        } else {
            return;　　　　　　　　　　
        }
    }
    document.onmouseup = function() {
        isDrop = false; //设置为false不可移动
        leftWidth = leftWidth + moveX;
        rightWidth = rightWidth - moveX;
        $(".target_content").css("width", leftWidth);
    	$(".data_template").css("width", rightWidth);
    	moveX = 0;
    }
});

