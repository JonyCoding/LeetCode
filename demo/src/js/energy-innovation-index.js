Vue.prototype.$window = window;
let vm = new Vue({
	el: "#app",
	data: function () {
		return {
      activeName:"second",
      tableData:[
        {
          contry:"中国",
          environment:"A+",
          investment:"A+",
          results:"A+",
          produce:"A+",
          score:"A+"
        },
        {
          contry:"中国",
          environment:"A+",
          investment:"A+",
          results:"A+",
          produce:"A+",
          score:"A+"
        },
        {
          contry:"中国",
          environment:"A+",
          investment:"A+",
          results:"A+",
          produce:"A+",
          score:"A+"
        },
        {
          contry:"中国",
          environment:"A+",
          investment:"A+",
          results:"A+",
          produce:"A+",
          score:"A+"
        },
        {
          contry:"中国",
          environment:"A+",
          investment:"A+",
          results:"A+",
          produce:"A+",
          score:"A+"
        },
        {
          contry:"中国",
          environment:"A+",
          investment:"A+",
          results:"A+",
          produce:"A+",
          score:"A+"
        },
        {
          contry:"中国",
          environment:"A+",
          investment:"A+",
          results:"A+",
          produce:"A+",
          score:"A+"
        },
        {
          contry:"中国",
          environment:"A+",
          investment:"A+",
          results:"A+",
          produce:"A+",
          score:"A+"
        },
        {
          contry:"中国",
          environment:"A+",
          investment:"A+",
          results:"A+",
          produce:"A+",
          score:"A+"
        },
      ]
		};
	},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
});

  