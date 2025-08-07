# 封装的JSONP

- 只能解决GET 请求的跨域问题

- 需要后端的配合
    后端的输出方式要加padding
- 不太安全
    全局挂在了一个show callback 函数 