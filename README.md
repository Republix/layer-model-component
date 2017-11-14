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

var layer = new layerComponent(layerConfig);  // 配置 组件信息 如不添加配置，执行默认配置

var comfirmFun = function() {  // 按需使用的确认方法
  console.log('true');
}
var rejectFun = function() {  // 按需使用的取消方法
  console.log('false');
}
layer.show(comfirFun, rejectFun);  // 显示模态框 并初始化其 点击确认，取消 方法
```
