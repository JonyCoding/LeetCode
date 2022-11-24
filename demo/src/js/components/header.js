
Vue.component("h-header", {
    data: function () {
        return {};
    },
    methods: {},
    template: `                
  <header class="index-head">
	<div class="flex-container">
		<div class="logo">
			<img src="./img/logo.png" alt="" srcset="" />
		</div>
		<div class="head-menu">
			<div id="user-action-mobil" class="user-action">
				<div class="login-button login"><a href="">登录</a></div>
				<div class="login-button register"><a href="">注册</a></div>
			</div>
			<ul class="menu-list">
				<li class="menu-item"><a href="">首页</a></li>
				<li class="menu-item"><a href="">能源数据</a></li>
				<li id="knowledge" class="parent-menu menu-item">
					<a href="javascript:;">知识服务<i class="bi bi-chevron-down bi-active"></i></a>
					<ul id="show-knowledge" class="child-menu-list">
						<li><a>能源新闻</a></li>
						<li><a>能源政策</a></li>
						<li><a>政策解读</a></li>
						<li><a>碳中和解读</a></li>
						<li><a>能源讲座</a></li>
						<li><a>碳中和传递</a></li>
					</ul>
				</li>
				<li class="menu-item"><a href="">专利导航</a></li>
				<li id="technology" class="parent-menu menu-item">
					<a href="javascript:;">技术评估<i class="bi bi-chevron-down bi-active"></i></a>
					<ul id="show-technology" class="child-menu-list">
						<li><a>技术清单</a></li>
						<li><a>能源科技评价</a></li>
					</ul>
				</li>
				<li class="menu-item"><a href="">工具</a></li>
				<li class="menu-item"><a href="">关于我们</a></li>
			</ul>
		</div>
		<div id="user-action-pc" class="user-action">
			<div class="login-button login"><a href="">登录</a></div>
			<div class="login-button register"><a href="">注册</a></div>
		</div>
		<div id="menu-action" class="user-menu user-menu-close">
			<div class="login-button login">
				<a id="mobil-i" style="color: white" href="javascript:;"><i class="bi bi-menu-button"></i></a>
			</div>
		</div>
	</div>
</header>

`,
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
