Vue.prototype.$window = window;
let vm = new Vue({
	el: "#app",
	data: function () {
		return {
			activeName: "first",
		};
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
		},
	},
});

//菜单栏
$(document).ready(function () {
	$(".title").click(function () {
		if ($(this).parents("section").find("ul").length > 0) {
      // 如果有子树  应该展开而不是被选择
			$(this).parents("section").find("ul").toggleClass("tree-child-active");
		} else {
			// 释放之前的选择项,此处每一个大的分类互不影响
      $(this).parents(".tree-container").find(".title-active").removeClass("title-active")
			$(this).toggleClass("title-active");
		}
	});
});
$(document).ready(function () {
	$(".open-content").click(function () {
    // 释放之前的选择项,此处每一个大的分类互不影响
		$(".open-content").removeClass("title-active");
    $(this).parents(".tree-container").find(".title-active").removeClass("title-active")
		$(this).toggleClass("title-active");
	});
});

//左侧树形在移动端的显示和隐藏
$(document).ready(function () {
	$(".open-tree").click(function () {
		$(".tree-UI").addClass("tree-show");
		$(".dusk-view").addClass("dusk-view-show");
	});
	$(".dusk-view").click(function () {
		$(".tree-UI").removeClass("tree-show");
		$(".dusk-view").removeClass("dusk-view-show");
	});
});