# layer-model-component
复用提示框 &amp; 模态框

##  原型

使用方法

```bash
var layerConfig = {  // 声明配置  非必需
  title: '标题',
  content: '内容',
  confirm: '确认按钮Text',
  canel: '取消按钮Text',
  animation: false // 是否开启初始动画 默认为true
}

var layer = new layerComponent();  

var comfirmFun = function() {  // 按需使用的确认方法
  console.log('true');
}
var rejectFun = function() {  // 按需使用的取消方法
  console.log('false');
}
layer.show(layerConfig comfirFun, rejectFun);  // 显示模态框 并初始化其 点击确认，取消 方法
或直接使用默认配置
layer.show(comfirFun, rejectFun);
```

![images](https://github.com/Republix/layer-model-component/blob/master/preview/preview.png)
