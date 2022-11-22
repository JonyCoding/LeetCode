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

/**
 * 导出文件方法
 * @param {String} method [请求方式]
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {String} fileName [导出的文件名]
 */
function DOWNLOAD(method = "post", url, params, fileName) {
	return new Promise((resolve, reject) => {
		axios({
			method: method,
			url: url,
			data: params,
			responseType: "blob",
		}).then((res) => {
			console.log(res.headers);
			let reader = new FileReader();
			let data = res.data;
			reader.onload = (e) => {
				if (e.target.result.indexOf("Result") != -1 && JSON.parse(e.target.result).Result == false) {
					console.log("错误");
				} else {
					if (!fileName) {
						let contentDisposition = res.headers["content-disposition"];
						if (contentDisposition) {
							fileName = window.decodeURI(res.headers["content-disposition"].split("=")[2].split("''")[1], "UTF-8");
						}
					}
					executeDownload(data, fileName);
				}
			};
			reader.readAsText(data);
			resolve(res.data);
		});
	});
}
//  模拟点击a 标签进行下载
function executeDownload(data, fileName) {
	if (!data) {
		return;
	}
	let url = window.URL.createObjectURL(new Blob([data]));
	let link = document.createElement("a");
	link.style.display = "none";
	link.href = url;
	link.setAttribute("download", fileName);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

/**
 * 格式化日期
 * @param {String} fmt [日期类型 默认为年月日（yyyy-MM-dd）]
 */
Date.prototype.format = function (fmt = "yyyy-MM-dd") {
	var date = {
		"y+": this.getFullYear(),
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		S: this.getMilliseconds(),
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var key in date) {
		if (new RegExp("(" + key + ")").test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1 ? date[key] : ("00" + date[key]).substr(("" + date[key]).length)
			);
		}
	}
	return fmt;
};
/**
 * 返回带有时区的时间
 * @param {String} fmt [日期类型 默认为年月日（yyyy-MM-dd hh:mm:ss）]
 */
Date.prototype.getUtcTime = function (format = "yyyy-MM-dd hh:mm:ss") {
	return this.format(format) + "GMT" + Math.abs(new Date().getTimezoneOffset() / 60) + "00";
};
/**
 * 获取当前月的最后一天
 * @param {String} fmt [日期类型 默认为年月日（yyyy-MM-dd）]
 */
Date.prototype.getCurrentMonthLast = function (format = "yyyy-MM-dd") {
	var currentMonth = this.getMonth();
	var nextMonth = ++currentMonth;
	var nextMonthFirstDay = new Date(this.getFullYear(), nextMonth, 1);
	var oneDay = 1000 * 60 * 60 * 24;
	return new Date(nextMonthFirstDay - oneDay).format(format);
};
/**
 * 获取当前月的第一天
 * @param {String} fmt [日期类型 默认为年月日（yyyy-MM-dd）]
 */
Date.prototype.getCurrentMonthFirst = function (format = "yyyy-MM-dd") {
	return new Date(this.getFullYear(), this.getMonth(), 1).format(format);
};
