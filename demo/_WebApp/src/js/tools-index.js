Vue.prototype.$window = window;
let vm = new Vue({
  el: "#app",
  data: function () {
    return {
      tab: false,
    };
  },
  beforeCreate: function () {},
  methods: {},
});

//菜单栏
$(document).ready(function () {
  var i = 1;

  $("#myCarousel").carousel({
    interval: 2000,
  });
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
$(document).ready(function () {
  let Number = {
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
  };
  for (let i = 1; i <= 8; i++) {
    $(function () {
      $("#collapse" + Number[i]).on("show.bs.collapse", function () {
        $("#acitve" + Number[i] + " .bi-down").addClass("bi-active");
        $("#acitve" + Number[i] + " .panel-heading").addClass(
          "panel-heading-active"
        );
      });
      $(function () {
        $("#collapse" + Number[i]).on("hide.bs.collapse", function () {
          $("#acitve" + Number[i] + " .bi-down").removeClass("bi-active");
          $("#acitve" + Number[i] + " .panel-heading").removeClass(
            "panel-heading-active"
          );
        });
      });
    });
  }
});

//菜单栏
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
  //菜单栏
  $(document).ready(function () {
    var i = 1;
    $(".float-menu").click(function () {
      if (i == 0) {
        // 隐藏
        $(".tool-menu").removeClass("tool-menu-active");
        $(".diskDuck").removeClass("disk-show");
        i = 1;
      } else {
        // 显示
        $(".tool-menu").addClass("tool-menu-active");
        $(".diskDuck").addClass("disk-show");
        i = 0;
      }
    });
    $(".diskDuck").click(function () {
      // 隐藏
      $(".tool-menu").removeClass("tool-menu-active");
      $(".diskDuck").removeClass("disk-show");
      i = 1;
    });
  });
});
