Vue.prototype.$window = window;
let vm = new Vue({
	el: "#app",
	data: function () {
		return {
      activeName:"first"
		};
	},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
});

  