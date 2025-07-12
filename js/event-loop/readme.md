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


微任务包括：MutationObserver、Promise.then()或catch()、Promise为基础开发的其它技术，比如fetch API、V8的垃圾回收过程、Node独有的process.nextTick、queueMicrotask()，await。

宏任务包括：script 、setTimeout、setInterval 、setImmediate 、I/O 、UI rendering。

## 多进程和多线程
- CPU 轮循
  
- 进程
分配资源的最小单元
  内存（地址， 物理） CPU计算的机会
  独立的进程ID 一定的大小，开销
  程序运行以进程为单位
  - 主进程
    管理子进程 父子关系 并发 并行
    进程间通信
    - 主线程
      执行js代码...
- 线程
  干活的 

- chrome浏览器是多进程架构
  - 浏览器主进程
    多线程
  - 一个tab 就是一个渲染进程
    多线程
    几个tab 几个进程
    安全、 一个页面crash 了，别的不受影响
  - 主线程 主角
    js 单线程 同时只执行一个任务
    - 简单 
    - DOM编程模型 线程的争抢不可以  安全

  - setTimeout 专属定时器线程 
    到时间了，callback 放入宏任务队列
    放到event loop中 队列中
    为什么setTimeout 不准

    event loop 机制
    宏任务， 微任务 队列
    - addEventListener 没有独立的线程
      DOM 不需要    宏任务队列
    - fetch/xhr 专属的下载线程


- 渲染进程的主线程
  - 解析HTML -> DOM 树
  - 解析CSS -> CSSOM 树
  - 合并DOM 和 CSSOM 生成 renderTree
  - 结合 渲染树
  - layout 树
  - 合并图层
  - v8 引擎 JS 执行
  - 独立的绘制线程

- 事件队列
  - 定时器到点了
  - onreadystatechange 4
  - 宏任务队列
  - 微任务队列

- 页面渲染
