# react 事件机制
- js 事件机制
    - 异步
    - 监听一个事件
        - addEventListener()    DOM2 事件
        - DOM 0
        <a onclick="doSomething()"></a>
        - DOM 1? DOM 版本， 没有去做事件升级

    - addEventListner(type, listener);
    - 回调函数 callback 异步处理的称呼
    - promise then
    - async await
      type，listener， useCapture？
      监听器
- 注册事件 addEventListner
- useCapture false 默认值
    页面是浏览器渲染引擎按像素点画出来的 png
    先捕获 document -> 一层层去问
        点了谁？
        先触发父元素
    event.target
        捕获阶段结束，拿到event.target 
    冒泡
        event.target 冒泡到html 回去到根
        事件让他在冒泡阶段执行
        在哪个阶段执行
        



完整流程
1. 事件注册

( type , listener , useCapture ) ;

- type : 事件类型(如'click')
- listener : 事件触发时的回调函数
- useCapture : 可选参数，默认为false(冒泡阶段)
2. 事件流阶段
   
   - 捕获阶段(Capture Phase) :
     - 从document开始，逐级向下传播到目标元素
     - 如果useCapture为true，会在此阶段触发监听器
   - 目标阶段(Target Phase) :
     - 到达实际触发事件的元素(event.target)
   - 冒泡阶段(Bubble Phase) :
     - 从目标元素向上冒泡到document
     - 默认情况下(addEventListener的useCapture为false)在此阶段触发监听器
3. 事件对象
- 通过event.target可以获取实际触发事件的元素
- 其他常用属性:
  - event.currentTarget: 当前处理事件的元素
  - event.type: 事件类型
  - event.stopPropagation(): 停止事件传播

## 事件委托优势 delegation
- 性能优化
  - 极致将事件委托给最外层元素
  react 大型项目开发
  给我们的事件节点event.target 添加一个唯一属性
  
- 动态节点的事件
  滚动到底部，一次新增一堆的新元素
  事件委托可以有效解决
- 同一元素同一事件注册多次
  - dom节点
  - event type 事件类型
  - 监听器（回调函数）event loop
    event 对象
  - useCapture
    
  - event.preventDefault()
    form submit 
    a 
    阻止默认行为
    阻止冒泡
    阻止事件
  - event.stopPropagation()
    阻止冒泡

- 用户交互的便利体验问题
  - toggle按钮
  - 点击页面任何地方可以关闭  方便 stopPropagation
  - 显示区域可以交互， 不关闭

- SyntheticEvent 合成事件
  - 委托 #root
      性能优化框架帮我们做
  - 事件池 event pooling
      事件对象的回收利用
      大型密集交互的应用
  
      