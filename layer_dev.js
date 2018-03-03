function layerComponent(config) {
	// config variable
	var layerComponentVariable = {
		config: {
			title: String,
			content: String,
			confirmValue: String,
			canelValue: String,
			animation: Boolean
		},
		Fun: {
			resolveFun: Object,
			rejectFun: Object,
		},
		dom: {
			layerDom: Object,
			layerFrameHeaderTitle: Object,
			layerFrameContent: Object,
			layerFrameConfirmBtn: Object,
			layerFrameCanelBtn: Object	
		}
	};
	var _that = layerComponentVariable;

	var defaultConfig = {
		title: '确认操作',
		content: '选择一个操作',
		confirmValue: '确认',
		canelValue: '取消',
		animation: true
	}

	// 初始化 DOM
	initLayer();

	// 初始化 配置入口
	function initComponent(config) {
		setConfig(config);
		initConfig();
	}

	// 设置 config 变量
	function setConfig(config) {
		_that.config.title = (config.title) ? config.title : defaultConfig.title;
		_that.config.content = (config.content) ? config.content : defaultConfig.content;
		_that.config.confirmValue = (config.confirmValue) ? config.confirmValue : defaultConfig.confirmValue;
		_that.config.canelValue = (config.canelValue) ? config.canelValue : defaultConfig.canelValue;
		_that.config.animation = (config.animation != undefined) ? config.animation : defaultConfig.animation;
	}
	// 初始化 组件信息 方法
	function initConfig(config) {
		// animation switcher
		if(_that.config.animation == true) {
			var originClass = _that.dom.layerDom.className;  // 追加样式
			setClass(_that.dom.layerDom, originClass+ ' ' + "layer-do-init-animation");
		}

		// 方便后续更改
		function setItem(title, content, confirmValue, canelValue) {
			_that.dom.layerFrameHeaderTitle.innerHTML = title;
			_that.dom.layerFrameContent.innerHTML = content;
			_that.dom.layerFrameConfirmBtn.innerHTML = confirmValue;
			_that.dom.layerFrameCanelBtn.innerHTML = canelValue;
		}
		var title = _that.config.title;
		var content = _that.config.content;
		var confirmValue = _that.config.confirmValue;
		var canelValue = _that.config.canelValue;
		setItem(title, content, confirmValue, canelValue);
	}
	// 初始化 DOM 方法
	function initLayer() {
		var body = document.getElementsByTagName('body')[0];
		// main container
		var layerContainer = document.createElement("div");
		body.appendChild(layerContainer);

		setClass(layerContainer, "layer-container");

		// main component
		var layer = document.createElement("div");
		layerContainer.appendChild(layer);
		setClass(layer, "layer-dev");

		// appendChild
		var layerFrameHeader = document.createElement("div");
		var layerFrameContent = document.createElement("div");
		var layerFrameFooter = document.createElement("div");
		layer.appendChild(layerFrameHeader);
		layer.appendChild(layerFrameContent);
		layer.appendChild(layerFrameFooter);
		setClass(layerFrameHeader, "layer-frame-header");
		setClass(layerFrameContent, "layer-frame-content");
		setClass(layerFrameFooter, "layer-frame-footer");

		// layer.header
		var layerCloseBtn = document.createElement('div');
		var layerFrameHeaderTitle = document.createElement("div");
		layerFrameHeader.appendChild(layerCloseBtn);
		layerFrameHeader.appendChild(layerFrameHeaderTitle);
		setClass(layerCloseBtn, "layer-close-btn");
		setClass(layerFrameHeaderTitle, "layer-frame-header-title");



		// close btn text
		var span = document.createElement("span");
		layerCloseBtn.appendChild(span);
		span.setAttribute("id", "layer-frame-close-btn");
		var aps = document.getElementById("layer-frame-close-btn");
		aps.innerHTML = "+";

		// layer.content
		setClass(layerFrameContent, "layer-frame-content");


		// layer.footer -- button-group
		var layerFrameConfirmBtn = document.createElement("button");
		var layerFrameCanelBtn = document.createElement("button");

		layerFrameFooter.appendChild(layerFrameConfirmBtn);
		layerFrameFooter.appendChild(layerFrameCanelBtn);
		setClass(layerFrameConfirmBtn, "layer-button layer-frame-confirm-btn");
		setClass(layerFrameCanelBtn, "layer-button layer-frame-canel-btn");

		// 组件内变量
		_that.dom.layerDom = layerContainer;
		_that.dom.layerCloseBtn = layerCloseBtn;
		_that.dom.layerFrameHeaderTitle = layerFrameHeaderTitle;
		_that.dom.layerFrameContent = layerFrameContent;
		_that.dom.layerFrameConfirmBtn = layerFrameConfirmBtn;
		_that.dom.layerFrameCanelBtn = layerFrameCanelBtn;

	
		function setID(dom, idName) {
			dom.setAttribute("id", idName);
			return document.getElementById(idName);
		}
	}

	// 初始化 确认取消事件 方法 & 绑定Dom
	function initFun(resolveFun, rejectFun) {
		_that.Fun.resolveFun = resolveFun;
		_that.Fun.rejectFun = rejectFun;

		_that.dom.layerCloseBtn.onclick = function() {
			hidden();
			if(_that.Fun.rejectFun) {
				_that.Fun.rejectFun();
			}
		}
		_that.dom.layerFrameConfirmBtn.onclick = function() {
			hidden();
			if(_that.Fun.resolveFun) {
				_that.Fun.resolveFun();
			}
		}
		_that.dom.layerFrameCanelBtn.onclick = function() {
			hidden();
			if(_that.Fun.rejectFun) {
				_that.Fun.rejectFun();
			}
		}
	}

	// 设置样式
	function setClass(dom, className) {
		if(window.navigator.userAgent.indexOf("MSIE") >= 1) {
			dom.className = className;
		} else {
			dom.setAttribute("class", className);
		}
	}

	// 显示模态框
	function showModal(resolveFun, rejectFun) {
		initFun(resolveFun, rejectFun);
		_that.dom.layerDom.style.display = "flex";
	}

	// 隐藏模态框
	function hidden() {
		_that.dom.layerDom.style.display = "none";
	}
	
	return {
		'show': function(config, resolveFun, rejectFun) {
			if( typeof(config) == 'object' ) {
				initComponent(config);
				showModal(arguments[1], arguments[2]);
			} else {
				initComponent({});
				showModal(arguments[0], arguments[1]); 				
			}
		}
	}
}

function layerMsgComponent(config) {

}
