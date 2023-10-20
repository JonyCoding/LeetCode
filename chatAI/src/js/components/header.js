Vue.component("h-header", {
	data: function () {
		return {
			isSelect: "index",
			menuList: [
				{
					title: "首页",
					pageURL: "index.html",
				},
				{
					title: "数据",
					pageURL: "data.html",
				},
				{
					title: "产品",
					pageURL: "chat.html",
				}
			],
		};
	},
	props:{
		path:String
	},
	mounted() {
		function camelize(str) {
			const camelizeRE = /-(\w)/g;
			return str.replace(camelizeRE, function (_, c) {
				return c ? c.toUpperCase() : "";
			});
		}
		this.menuList.forEach((menu) => {
			this.$set(menu, "key", camelize(menu.pageURL.split('.html')[0]));
			if (menu.child && menu.child.length > 0) {
				let childKeyList = [];
				menu.child.forEach((child) => {
					this.$set(child, "key", camelize(child.pageURL.split('.html')[0]));
					childKeyList.push(child.key);
				});
				this.$set(menu, "childKeys", childKeyList);
			}
		});
		this.isSelect = camelize(this.path.replace(/\//g,'').split('.html')[0])
	},
	methods: {},
	template: `                
  <header class="index-head">
	<div class="flex-container">
		<div class="logo">
			<img src="./img/logo-blue.png" alt="" srcset="" />
		</div>
		<div class="head-menu">
            <i class="close-action el-icon-close"></i>
            <div id="mobil-logo" class="user-action">
                <img src="./img/logo-blue.png" alt="" srcset="" />
            </div>
			<ul class="menu-list">
				<template v-for="item in menuList">
					<li v-if="item.child&&item.child.length>0" :id="item.childKeys&&item.childKeys.includes(isSelect)?'is-select':''" class="parent-menu menu-item">
						<a class="child-menu-title" href="javascript:;">{{item.title}}<i class="bi bi-chevron-down bi-active"></i></a>
						<ul id="show-knowledge" class="child-menu-list">
							<li v-for="item2 in item.child" :id="isSelect===item2.key?'is-select-child':''"><a :href="'./'+item2.pageURL">{{item2.title}}</a></li>
						</ul>
					</li>
					<li v-else :id="isSelect=== item.key?'is-select':''" class="menu-item"><a :href="'./'+item.pageURL">{{item.title}}</a></li>
				</template>
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
			if ($(this).hasClass("menu-item-active")) {
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
