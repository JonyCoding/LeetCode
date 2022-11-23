// @if DEBUG=true
console.log("debug");
//imports('../../extend_lib/vue/dist/vue.js');
//imports('../../extend_lib/vue-i18n/dist/vue-i18n.js');
//imports('../../extend_lib/axios/axios.js');
// @endif

// @if DEBUG=false
console.log("product");
//imports('../../extend_lib/vue/dist/vue.min.js');
//imports('../../extend_lib/vue-i18n/dist/vue-i18n.min.js');
//imports('../../extend_lib/axios/axios.min.js');
// @endif

//imports('../../extend_lib/elementui/index.js');
//imports('../../extend_lib/elementui/local/ja.js');
//imports('../../extend_lib/getArgs.js');

/*
 *
 */
function loadJS(url, callback) {
	var script = document.createElement("script"),
		fn = callback || function () {};
	script.type = "text/javascript";
	//IE
	if (script.readyState) {
		script.onreadystatechange = function () {
			if (script.readyState == "loaded" || script.readyState == "complete") {
				script.onreadystatechange = null;
				fn();
			}
		};
	} else {
		//其他浏览器
		script.onload = function () {
			fn();
		};
	}
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function loadModule(url, callback) {
	var script = document.createElement("script"),
		fn = callback || function () {};
	script.type = "module";
	//IE
	if (script.readyState) {
		script.onreadystatechange = function () {
			if (script.readyState == "loaded" || script.readyState == "complete") {
				script.onreadystatechange = null;
				fn();
			}
		};
	} else {
		//其他浏览器
		script.onload = function () {
			fn();
		};
	}
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}
/*
判断是否IE浏览器
*/
function isIE() {
	if (!!window.ActiveXObject || "ActiveXObject" in window) return true;
	else return false;
}
