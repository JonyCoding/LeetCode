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
		<div class="footer-link">
			<h3>友情链接</h3>
			<div class="link-list">
				<ul>
					<li><a href="">大连化学物理研究所</a></li>
					<li><a href="">青岛生物能源所</a></li>
					<li><a href="">上海高等研究院</a></li>
					<li><a href="">武汉文献情报中心</a></li>
				</ul>
				<ul>
					<li><a href="">大连化学物理研究所</a></li>
					<li><a href="">青岛生物能源所</a></li>
					<li><a href="">上海高等研究院</a></li>
					<li><a href="">武汉文献情报中心</a></li>
				</ul>
			</div>
		</div>
		<div class="footer-service">
			<div class="service">
				<img src="./img/qrcode.png" alt="" srcset="" />
			</div>
		</div>
	</div>
	<div class="copy-right">
		<p>Copyright © 中国科学院大连化学物理研究所 能源战略研究中心 备案号： 辽ICP备05000861号</p>
	</div>
</footer>
  `,
});
