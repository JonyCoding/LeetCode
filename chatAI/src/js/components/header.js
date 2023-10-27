Vue.component("h-header", {
	data: function () {
		return {
			isSelect: "index",
			userName: "这是用户名",
			menuList: [
				// {
				// 	title: "首页",
				// 	pageURL: "index.html",
				// },
				// {
				// 	title: "数据",
				// 	pageURL: "data.html",
				// },
				// {
				// 	title: "产品",
				// 	pageURL: "chat.html",
				// }
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
			<div v-if="!userName" class="login-button login"><a href="">
				<svg t="1698332177289" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5265" width="25" height="25"><path d="M858.5 763.6c-18.9-44.8-46.1-85-80.6-119.5s-74.7-61.6-119.5-80.6c-0.4-0.2-0.8-0.3-1.2-0.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362C264 444.7 304.5 518 366.8 563.1c-0.4 0.2-0.8 0.3-1.2 0.5-44.8 18.9-85 46-119.5 80.6-34.5 34.5-61.6 74.7-80.6 119.5-18.6 43.8-28.5 90.3-29.5 138.1-0.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3C356.5 641.2 431.8 610 512 610s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c0.1 4.4 3.6 7.8 8 7.8h60c4.5 0 8.1-3.7 8-8.2-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362s17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362s-17.9 89.1-50.4 121.6S557.9 534 512 534z" p-id="5266" fill="#5240ff"></path></svg>
			</a></div>
			<div v-else class="login-button login"><a href="">
				{{userName}}
			</a></div>
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
