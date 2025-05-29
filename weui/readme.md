# 微信当家框架WEUI

## BEM 国际命名规范

Block Element Modifier
块 元素 修饰符


- 项目 .weui-page
    - button 页面
规范
- Block 概念
    一块内容    项目代号 风格+ 可复用的代码
    项目代号 + 区块等扽作用或职责 page
    .weui-page
    .tm-page
- Element 概念
    元素    __header
        块__
    同一个块中概念不重叠
    .weui-page__title
    .weui-page__desc
- UI **框架** 中button ， input ， cell ， 通用的 **组件**
    重启BEM 命名
    .weui-btn   **复用**

    学校中的是业务代码？
    大厂，
    基础架构代码    学习WEUI 的源码

    几个block组合起来， 页面就出来流， 组件式开发
- Modifier 
    状态
    .weui-btn_primary
    .weui-btn_default
- BEM 规范让我们一起大厂协作
    - 页面由block构成 .weui-{block}
    - block 包含一些elements .weui-{block}__{element}
    - element 会有些状态
        .weui-{block}__{element}_{modifier}