# Storage 存储

    - 前端存储
        - cookie
        存储啥玩意
          - 登录状态
          - 购物车
        - localStorage 持久化存储
        - sessionStorage 临时存储
        - indexDB

    - 后端存储
        MySQL NoSQL MongoDB

    - 缓存

## 首页
- 用户的登录状态
  cookie
  - 服务器识别用户
  - B/S 架构软件 http协议
  - http 0.9 版本 没有身份
  - http 是无状态协议
    请求一次和1000次，拿到的内容都一致
    身份状态？
    Authorization 
    Cookie uid = 1241212
    用户带上，服务器解析 你的身份了
    http 协议还是无状态的， 请求头可以加带一些私货
- 界面有哪些状态 
  未登录 已登录 用户身份 时间 过期 主动登出

- 前后端联调
  - 前端表单 
    阻止默认行为
    收集表单值
    fetch 请求 awiat 等待服务器端响应请求
    POST /login api地址 前后端接口
    后端
    路由 /login
    用户名和密码的校验
    通过设置cookie 响应头 Set-Cookie
    服务器端的返回 http 一起回到请求端
    前端存储里 Cookie 有了内容

## Cookie
Cookie 是浏览器存储的小文本数据， 用于记录用户会话、偏好等信息， 便于网站识别用户。
- 每次http访问的时候， 会自动带上cookie信息
- cookie 小饼干（内容小） 关键的身份信息， 存储在浏览器中（位置）

- Cookie是客户端存储机制
- HTTP协议本身仍保持无状态特性，每次请求独立，但通过在请求头中携带cookie 信息，实现身份认证