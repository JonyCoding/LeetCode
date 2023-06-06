Vue.prototype.$window = window;
let vm = new Vue({
	el: "#app",
	data: function () {
		return {};
	},
});
/* global jsPlumb */
jsPlumb.ready(function () {
    var common = {
      endpoint: 'Blank',
      connector: ['Flowchart'],
      anchor: ['Left', 'Right']
    }

    jsPlumb.connect({
      source: 'item_left',
      target: 'item_right'
    }, common)
    // 是否可拖拽
    // jsPlumb.draggable('item_left')
    // jsPlumb.draggable('item_right')
  })