var DatabaseStatistics = {
	checkViewIdArr:[],
	checkDataArr:[],
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
						+ '<div class="target_data_toggle"><input type="checkbox" class="target_data_toggle_class" onclick="DatabaseStatistics.clickTargetDataToggleClass(this)" viewId="' + n.viewId + '" viewName="' + n.viewName + '"></div>'
						+ '<div class="target_data_title" onclick="DatabaseStatistics.clickTargetDataTitle(this);">' + n.viewName + '</div>'
						+ '<div><button onclick="DatabaseStatistics.saveViewCare(' + n.viewId + ');">关注</button></div>'
						+ '</div>';
				});
				contentsListHtml = contentsListHtml + '</div>';
				$(obj).parent(".contents_data_node").parent(".contents_data_node_all").append(contentsListHtml);
				
				//判断能否拖拽
				if ($("#templateListFlag").val() == 1) {
					//使左侧数据库数列不能拖动
					$(".target_data_node").addClass("target_data_node_seal");
					$(".target_data_node").removeClass("target_data_node");
				}
				
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
                    // 元素被选中
//                    onChoose: function (/**Event*/evt) {
//                        evt.oldIndex;  // element index within parent
//                    },
                    // 试图拖拽一个filtered的元素
//                    onFilter: function (/**Event*/evt) {
//                        var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
//                        console.log(2)
//                    },
                    // 开始拖拽的时候
                    onStart: function (/**Event*/evt) {
                        evt.oldIndex;  // element index within parent
                    },
                    // 结束拖拽
                    onEnd: function (/**Event*/evt) {
                    	console.log(222)
                    	var viewItem = $(evt.item).find(".target_data_toggle_class");
                    	if (DatabaseStatistics.checkViewIdArr.indexOf(viewItem.attr("viewId")) == -1) {
                    		DatabaseStatistics.checkViewIdArr.push(viewItem.attr("viewId"));
                    		var viewDetail = {"viewId":viewItem.attr("viewId"),"viewName":viewItem.attr("viewName")};
                    		DatabaseStatistics.checkDataArr.push(viewDetail);
                    	}
                    	//判断是否有此元素，没有就加进去
//                    	DatabaseStatistics.checkViewIdArr.splice(checkViewIdArrIndex,1);//删除此位置元素
//                		DatabaseStatistics.checkDataArr.splice(checkViewIdArrIndex,1);//删除此位置元素
                    	var evtTo = evt.to;
                    	if ($(evtTo).attr("class") == "progression_list") {
                    		$(evtTo).find(".target_data_node").remove();
                    		var checkHtml = "";
                    		//循环做拖拽过来的数据
                    		$.each(DatabaseStatistics.checkDataArr, function(i,n){
                    			checkHtml = checkHtml + '<div class="progression_node">'
	        						+ '<div class="progression_node_toggle"><input type="checkbox" class="progression_node_toggle_class" viewId="' + n.viewId + '" viewName="' + n.viewName + '"></div>'
	        						+ '<div class="progression_node_title" onclick="DatabaseStatistics.clickTargetDataTitle(this);">' + n.viewName + '</div>'
	        						+ '</div>';
                    		});
                    		$(evtTo).append(checkHtml);
                    		//清理选中数据
                    		DatabaseStatistics.checkViewIdArr = [];
                    		DatabaseStatistics.checkDataArr = [];
                    		//将checkbox取消选中
//                    		$.each($(".target_data_toggle_class:checked"),function(i,n){
////                    			n.checked = false;
//                    			$(n).prop("checked",false);//取消勾选
//                    		});
                    		$(".target_data_toggle_class:checked").removeAttr('checked');
//                    		for(var i = 0; i < $(".target_data_toggle_class:checked").length; i++) {
//                    			$(".target_data_toggle_class:checked")[i].checked = false;
//                    			i--;
//                    		}
                    		console.log(evt.from)
                    	}
                    },
                    onClone: function (/**Event*/evt) {
                    	console.log(111)
                    },
                });
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

//切换到我的数据模板列表
DatabaseStatistics.chooseTemplateList = function(){


	//  暂时先显示clone----------
	$(".template_detail_clone").hide();
	//  暂时先显示clone----------

	//切换flag
	$("#templateListFlag").val(1);
	//切换template_title
	$(".template_detail_show").hide();
	$(".template_detail").hide();
	$(".template_list_show").show();
	$(".template_list").show();
	//使左侧数据库数列不能拖动
	$(".target_data_node").addClass("target_data_node_seal");
	$(".target_data_node").removeClass("target_data_node");
}

//选择数据模板进行展示编辑
DatabaseStatistics.chooseTemplateDetail = function(templateId,templateName){
	//切换flag
	$("#templateListFlag").val(0);
	//切换template_title
	$(".template_list_show").hide();
	$("#template_detail_span").text(templateName);
	$(".template_detail_show").show();
	//使左侧数据库数列可以拖动
	$(".target_data_node_seal").addClass("target_data_node");
	$(".target_data_node_seal").removeClass("target_data_node_seal");
	//判断此模板是否在编辑
	if ($("#template_detail_"+templateId).length == 0) {
		//从数据库中取出数据，暂时没这功能，新建一块
		
		//  暂时先显示clone----------
		// var templateDetail = $(".template_detail_clone").clone(true);
		// templateDetail.addClass("template_detail");
		// templateDetail.removeClass("template_detail_clone");
		// templateDetail.attr("id","template_detail_"+templateId);
		$(".template_list").hide();
		$(".template_detail_clone").show();
		// $(".data_template").append(templateDetail);
		// $("#template_detail_"+templateId).show();
		//  暂时先显示clone----------
		
		//引入拖拽
		var sortable = Sortable.create($("#template_detail_"+templateId).find(".progression_list")[0], {
			group: {
                name: 'shared',
                pull: 'clone'
            },
            animation: 150,
            // 结束拖拽
            onEnd: function (/**Event*/evt) {
//                var itemEl = evt.item;  // dragged HTMLElement
//                evt.to;    // target list
//                evt.from;  // previous list
//                evt.oldIndex;  // element's old index within old parent
//                evt.newIndex;  // element's new index within new parent
//                evt.clone // the clone element
//                evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
            },
        });
	} else {
		$(".template_list").hide();
		$("#template_detail_"+templateId).show();
	}
}

DatabaseStatistics.saveViewCare = function(viewId) {
	var formData = new FormData();
	formData.append("viewId", viewId);
	$.ajax({
		async: false,
		url: "/databaseStatistics/saveViewCare",
		type: "POST",
		data: formData,
		contentType: false,
		processData: false,
		success: function (data) {
			alert("关注成功!")
			// Feng.success("关注成功!");
		},
		error: function (data) {
			if (data.responseJSON) {
				alert("关注失败!" + data.responseJSON.message + "!")
				//Feng.error("关注失败!" + data.responseJSON.message + "!");
			}
		}
	});
}

DatabaseStatistics.selectViewCareList = function() {
	$.ajax({
		async: false,
		url: "/databaseStatistics/selectViewCareList",
		type: "POST",
		contentType: false,
		processData: false,
		success: function (data) {
			var viewCareHtml = '';
			$.each(data, function (i, n) {
				viewCareHtml = viewCareHtml + '<div class="target_data_node">'
					+ '<div class="target_data_toggle"><input type="checkbox"></div>'
					+ '<div class="target_data_title">' + n.viewName + '</div>'
					+ '<div><button onclick="DatabaseStatistics.removeViewCare(' + n.viewCareId + ');">取消关注</button></div>'
					+ '</div>';
			});
			$("#viewCareList").empty();
			$("#viewCareList").append(viewCareHtml);
		},
		error: function (data) {
			if (data.responseJSON) {
				alert("关注列表取得失败!" + data.responseJSON.message + "!")
				//Feng.error("关注列表取得失败!" + data.responseJSON.message + "!");
			}
		}
	});
}

DatabaseStatistics.removeViewCare = function(viewCareId) {
	var formData = new FormData();
	formData.append("viewCareId", viewCareId);
	$.ajax({
		async: false,
		url: "/databaseStatistics/removeViewCare",
		type: "POST",
		data: formData,
		contentType: false,
		processData: false,
		success: function (data) {
			alert("取消关注成功!")
			var viewCareHtml = '';
			$.each(data, function (i, n) {
				viewCareHtml = viewCareHtml + '<div class="target_data_node">'
					+ '<div class="target_data_toggle"><input type="checkbox"></div>'
					+ '<div class="target_data_title">' + n.viewName + '</div>'
					+ '<div><button onclick="DatabaseStatistics.removeViewCare(' + n.viewCareId + ');">取消关注</button></div>'
					+ '</div>';
			});
			$("#viewCareList").empty();
			$("#viewCareList").append(viewCareHtml);
		},
		error: function (data) {
			if (data.responseJSON) {
				alert("取消关注失败!" + data.responseJSON.message + "!")
				//Feng.error("关注失败!" + data.responseJSON.message + "!");
			}
		}
	});
}

DatabaseStatistics.clickTargetDataToggleClass = function(obj){
    if($(obj).is(':checked')){
		DatabaseStatistics.checkViewIdArr.push($(obj).attr("viewId"));
		var viewDetail = {"viewId":$(obj).attr("viewId"),"viewName":$(obj).attr("viewName")};
		DatabaseStatistics.checkDataArr.push(viewDetail);
    }else {
        var checkViewIdArrIndex = DatabaseStatistics.checkViewIdArr.indexOf($(obj).attr("viewId"))
		DatabaseStatistics.checkViewIdArr.splice(checkViewIdArrIndex,1);//删除此位置元素
		DatabaseStatistics.checkDataArr.splice(checkViewIdArrIndex,1);//删除此位置元素
    }
}

DatabaseStatistics.clickTargetDataTitle = function(obj){
	var rowView = $(obj).prev(".target_data_toggle").find("input")[0];
	if (rowView.checked == true) {
		rowView.checked = false;
		var checkViewIdArrIndex = DatabaseStatistics.checkViewIdArr.indexOf($(rowView).attr("viewId"))
		DatabaseStatistics.checkViewIdArr.splice(checkViewIdArrIndex,1);//删除此位置元素
		DatabaseStatistics.checkDataArr.splice(checkViewIdArrIndex,1);//删除此位置元素
	} else {
		rowView.checked = true;
		DatabaseStatistics.checkViewIdArr.push($(rowView).attr("viewId"));
		var viewDetail = {"viewId":$(rowView).attr("viewId"),"viewName":$(rowView).attr("viewName")};
		DatabaseStatistics.checkDataArr.push(viewDetail);
	}
}

//切换到我的制图
DatabaseStatistics.showProgression = function(obj){
	$(obj).parents(".template_detail").find(".template_chart").hide();
	$(obj).parents(".template_detail").find(".template_progression").show();
}

//切换到制图n
DatabaseStatistics.showChart = function(obj,chartNumber){
	$(obj).parents(".template_detail").find(".template_chart").hide();
	$(obj).parents(".template_detail").find(".template_progression").hide();
	$(obj).parents(".template_detail").find(".template_chart_"+chartNumber).show();
}

//增加一个制图
DatabaseStatistics.addChart = function (obj){
	var chartNumber = $(obj).parent().children(".chartNumber").val(); 
	var chartNumberNext = parseInt(chartNumber) + 1;
	//增加tab
	var chartTab = '<div onclick="DatabaseStatistics.showChart(this,' + chartNumberNext + ')">制图' + chartNumberNext + '</div>';
	$(obj).before(chartTab);
	$(obj).parent().children(".chartNumber").val(chartNumberNext);
	//增加tab内容
	var newChart = $(obj).parents(".template_detail").find(".template_chart_0").clone();
	//修改chart-div的class
	newChart.addClass("template_chart_"+chartNumberNext);
	newChart.removeClass("template_chart_0");
	//隐藏其他的
	$(obj).parents(".template_detail").find(".template_chart").hide();
	$(obj).parents(".template_detail").find(".template_progression").hide();
	newChart.css("display","block");
	$(obj).parents(".template_detail").find(".template_exhibition").append(newChart);
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

////下拉框查询组件点击查询栏时不关闭下拉框
//$(function () {
//	$("div.dropdown-menu").on("click", "[data-stopPropagation]", function (e) {
//		e.stopPropagation();
//	});
//});
////下拉框查询组件点击查询栏时不关闭下拉框
//$(function () {
//	$(".nav-item").click(function (e) {
//		e.preventDefault();
//		$(this).tab('show');
//	});
//});

