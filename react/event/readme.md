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

