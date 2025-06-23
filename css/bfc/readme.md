# BFC

- 在弹性布局之前， 我们一般用float 做两列式、三列式或多列式布局。
  - 业务场景
  - float 让元素向左浮动，向右浮动 两列
  - 都向左浮动 多列
  - 浮动元素会离开文档流， 但和定位离开的文档流不一样 
    浮动离开文档流不彻底

    文字围绕它浮动
    - 外层盒子里 overflow: hidden;
    触发生成一个BFC Block Formating Context
    块级格式化上下文
    .container 原来是一个block 块级盒子
    升级为BFC 盒子
    FC formating context 
    
    当使用flex 时， 子元素会在一起
    全新的渲染区域，不受外界支配
    FFC flex
- html 是最外层，第一个BFC 盒子
    - 块级元素是从上到下排列
    - 行内元素是从左到右排列
- BFC元素
    计算BFC的高度时，浮动元素也参与计算