Vue.component("h-header", {
	data: function () {
		return {
			isSelect: "patentService",
		};
	},
	methods: {},
	template: `                
  <header class="index-head">
	<div class="flex-container">
		<div class="logo">
			<img src="./img/logo.png" alt="" srcset="" />
		</div>
		<div class="head-menu">
            <i class="close-action el-icon-close"></i>
            <div id="mobil-logo" class="user-action">
                <img src="./img/logo-blue.png" alt="" srcset="" />
            </div>
			<ul class="menu-list">
				<li :id="isSelect==='index'?'is-select':''" class="menu-item"><a href="">首页</a></li>
				<li :id="isSelect==='energyData'?'is-select':''" class="menu-item"><a href="">能源数据</a></li>
				<li :id="isSelect==='ourResearch'?'is-select':''" class="menu-item"><a href="">我们的研究</a></li>
				<li :id="['literatureService','patentService','newsPolicy'].includes(isSelect)?'is-select':''" class="parent-menu menu-item">
					<a class="child-menu-title" href="javascript:;">知识服务<i class="bi bi-chevron-down bi-active"></i></a>
					<ul id="show-knowledge" class="child-menu-list">
						<li :id="isSelect==='literatureService'?'is-select-child':''"><a href="">文献服务</a></li>
						<li :id="isSelect==='patentService'?'is-select-child':''"><a href="">专利服务</a></li>
						<li :id="isSelect==='newsPolicy'?'is-select-child':''"><a href="">新闻/政策</a></li>
					</ul>
				</li>
				<li :id="isSelect==='dataTool'?'is-select':''" class="menu-item"><a href="">数据/工具</a></li>
				<li :id="['researchCooperation','jobOpportunities'].includes(isSelect)?'is-select':''" class="parent-menu menu-item">
					<a class="child-menu-title" href="javascript:;">联系我们<i class="bi bi-chevron-down bi-active"></i></a>
					<ul id="show-technology" class="child-menu-list">
						<li :id="isSelect==='researchCooperation'?'is-select-child':''"><a href="">研究合作</a></li>
						<li :id="isSelect==='jobOpportunities'?'is-select-child':''"><a href="">工作机会</a></li>
					</ul>
				</li>
			</ul>
			<div id="user-action-mobil" class="user-action">
				<div class="login-button login"><a href="">登录</a></div>
				<div class="login-button register"><a href="">注册</a></div>
			</div>
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
    <div class="diskDuck"></div>
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
	$(".diskDuck,.close-action").click(function () {
		// 隐藏
		$("#menu-action").addClass("user-menu-close");
		$(".head-menu").removeClass("head-active");
		$("#menu-action").removeClass("user-menu-action");
		$(".diskDuck").removeClass("disk-show");
		i = 1;
	});
	$(function () {
		$(".menu-list li").click(function () {
			if ($(this).hasClass('menu-item-active')) {
				$(".menu-list li").removeClass("menu-item-active");
			} else {
				$(".menu-list li").removeClass("menu-item-active");
				$(this).addClass("menu-item-active"); // 添加当前元素的样式
			}
		});
        $(".menu-list li").mouseleave(function () {
				$(".menu-list li").removeClass("menu-item-active");
		});
	});
});
