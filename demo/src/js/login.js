Vue.prototype.$window = window;
let vm = new Vue({
	el: "#app",
	data: function () {
		return {
			radio: "user",
		};
	},
});
console.log("this",vm.select)