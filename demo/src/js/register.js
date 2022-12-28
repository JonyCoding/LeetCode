Vue.prototype.$window = window;
let vm = new Vue({
	el: "#app",
	data: function () {
		return {
			radio: "user",
		};
	},
});

$("#select").on('change',function(){
	if($(this).val() === "" ) {
	  $(this).addClass("select-placeholder");
	} else {
	  $(this).removeClass("select-placeholder");
	}
  })