Vue.component("h-footer", {
	data: function () {
		return {
			ver: "",
		};
	},
	mounted: function () {
	},
	methods: {},
	template: `
	<footer class="index-footer">
	<div class="footer-container">
		<div class="footer-logo">
			<img width="300px" src="./img/logo.png" alt="" srcset="" />
		</div>
	</div>
	<div class="copy-right">
		<p>Copyright © 中国科学院大连化学物理研究所 能源战略研究中心 备案号： 辽ICP备05000861号</p>
	</div>
</footer>
  `,
});
