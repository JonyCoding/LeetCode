Vue.prototype.$window = window;
let vm = new Vue({
	el: "#app",
	data: function () {
		return {
		};
	},
});

const textarea = document.querySelector('textarea');

textarea.addEventListener('input', function() {
    this.style.height = 'auto'
    this.style.height = (this.scrollHeight) + 'px';
});