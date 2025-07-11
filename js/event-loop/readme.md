# event loop
事件循环机制 js 执行机制

- js 单线程
  同一时刻只做一件事
  同步任务尽快执行完，渲染页面（重绘重排），响应用户的交互（优先）
  耗时性的任务？
  - setTimeout/setInterval
  - fetch/ajax
  - eventListener
- script 脚本
  一个宏任务

- 微任务有哪些？
  紧急的，同步任务执行完后的一个补充
  - promise.then()
  - MutationObserver
    dom 改变在页面渲染前 拿到DOM 有啥改变


微任务包括：MutationObserver、Promise.then()或catch()、Promise为基础开发的其它技术，比如fetch API、V8的垃圾回收过程、Node独有的process.nextTick、queueMicrotask()等。

宏任务包括：script 、setTimeout、setInterval 、setImmediate 、I/O 、UI rendering。
