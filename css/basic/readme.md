# css 基础

- 一个属性与值的键值对称为声明 declaration
- 一个声明块 {} 中可以有多个声明
- 选择器 声明块作用的选择器选择的对应元素
- ruleset 多个 
- css 层叠样式表

## css 选择器
+ 兄弟选择器 紧挨着
~ 选择所有位于h1 之后的p 元素
  通用兄弟选择器， 选后续同级元素
> 子元素选择器， 选择所有 直接 作为 .container 子元素的 p 元素
伪类选择器 状态
CSS伪类用于定义元素特殊状态，如：hover、:active等。

//序号
//结构伪类
.container p:nth-child(3) 

.container 里面的第三个p元素

