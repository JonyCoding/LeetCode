Vue.prototype.$window = window;
let vm = new Vue({
	el: "#app",
	data: function () {
		return {
		};
	},
});

//菜单栏
$(document).ready(function () {
    var i = 1;
    $("#menu-action").click(function () {
      if (i == 0) {
        // 隐藏
        $("#menu-action").addClass("user-menu-close");
        $(".head-menu").removeClass("head-active");
        $("#menu-action").removeClass("user-menu-action");
        $(".diskDuck").removeClass("disk-show");
        i = 1;
      } else {
        // 显示
        $("#menu-action").addClass("user-menu-action");
        $(".head-menu").addClass("head-active");
        $("#menu-action").removeClass("user-menu-close");
        $(".diskDuck").addClass("disk-show");
        i = 0;
      }
    });
    $(".diskDuck").click(function () {
        // 隐藏
        $("#menu-action").addClass("user-menu-close");
        $(".head-menu").removeClass("head-active");
        $("#menu-action").removeClass("user-menu-action");
        $(".diskDuck").removeClass("disk-show");
        i = 1;
    });
    $(".logp").click(function () {
      if (i == 0) {
        $("#menu-action").addClass("user-menu-close");
        $(".index-head").removeClass("head-active");
        $("#menu-action").removeClass("user-menu-action");
        i = 1;
      } else {
        $("#menu-action").addClass("user-menu-action");
        $(".index-head").addClass("head-active");
        $("#menu-action").removeClass("user-menu-close");
        i = 0;
      }
    });
  
  });
  