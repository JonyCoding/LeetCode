Vue.prototype.$window = window;
let vm = new Vue({
	el: "#app",
	data: function () {
		return {
			input3: "",
			select: true,
			form
		};
	},
});
console.log("this",vm.select)