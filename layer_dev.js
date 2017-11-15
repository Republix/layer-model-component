function layerComponent(config, ab, rj) {
	this.title;
	this.content;
	this.confirm;
	this.canel;
	this.mask; // future
	this.layerDom;
	this.theme; // future
	this.animation;
	this.resolveFun;
	this.rejectFun;

	var _that = this;
	// this.id;
	initDefault();  // init End

	if(config) {
		var config = setConfig(config);
		initLayer(config);
	} else { 
		// var config = setDefault();
		// initLayer(setDefault);
	}

	function initLayer(config) {
		var body = document.getElementsByTagName('body')[0];
		// main container
		var layerContainer = document.createElement("div");
		this.layerDom = layerContainer;

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


		function setClass(dom, className) {
			if(window.navigator.userAgent.indexOf("MSIE") >= 1) {
				dom.className = className;
			} else {
				dom.setAttribute("class", className);
			}
		}
		function setID(dom, idName) {
			dom.setAttribute("id", idName);
			return document.getElementById(idName);
		}
		layerCloseBtn.onclick = function() {
			hidden();
			if(_that.rejectFun) {
				_that.rejectFun();
			}
		}
		layerFrameConfirmBtn.onclick = function() {
			hidden();
			if(_that.resolveFun) {
				_that.resolveFun();
			}
		}
		layerFrameCanelBtn.onclick = function() {
			hidden();
			if(_that.rejectFun) {
				_that.rejectFun();
			}
		}

		// animation switcher
		if(config.animation) {
			if(config.animation == true) {
				var originClass = layerContainer.className;  // 追加样式
				setClass(layerContainer, originClass+ ' ' + "layer-do-init-animation");
			}
		}

		function setItem(title, content, confirm, canel) {
			layerFrameHeaderTitle.innerHTML = title;
			layerFrameContent.innerHTML = content;
			layerFrameConfirmBtn.innerHTML = confirm;
			layerFrameCanelBtn.innerHTML = canel;
		}
		setItem(config.title, config.content, config.confirm, config.canel);
	}

	function setConfig(config) {
		if(config.title) {
			this.title = config.title;
		}
		if(config.content) {
			this.content = config.content;
		}
		if(config.confirm) {
			this.confirm = config.confirm;
		}	
		if(config.canel) {
			this.canel = config.confirm;
		}
		if(config.animation != undefined) {  // 此处涉及 true false 
			this.animation = config.animation;
		}
		return {
			title: this.title,
			content: this.content,
			confirm: this.confirm,
			canel: this.canel,
			animation: this.animation
		}
	}
	function initDefault() {
		title = "请确认";
		content = "";
		confirm = "Sure";
		canel = "Canel";
		animation = true;
		return {
			title: title,
			content: content,
			confirm: confirm,
			canel: canel,
			animation: animation
		}
	}

	function showModal(resolveFun, rejectFun) {
		// 注意作用域
		_that.resolveFun = resolveFun;
		_that.rejectFun = rejectFun;
		this.layerDom.style.display = "flex";
	}
	function hidden() {
		this.layerDom.style.display = "none";
	}
	return {
		'show': function(resolveFun, rejectFun) {
			showModal(resolveFun, rejectFun); 
		}
	}
}

