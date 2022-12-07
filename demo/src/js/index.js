Vue.prototype.$window = window;
let vm = new Vue({
	el: "#app",
	data: function () {
		return {};
	},
});

//菜单栏
$(document).ready(function () {
	$(".title").click(function () {
		$(this).parents("section").find("ul").toggleClass("tree-child-active");
	});
	
});
$(document).ready(function () {

	$(".open-content").click(function () {
		console.log("222")
		$(".content-body").toggleClass("tree-child-active");
	});
	$(".close").click(function () {
		$(".content-body").removeClass("tree-child-active");
	});
	
});
