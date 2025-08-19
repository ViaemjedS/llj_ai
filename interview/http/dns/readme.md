# dns   

- 全称 Domain Name System
- 把好理解和记忆的域名解析和IP地址的*分布式数据库*系统
    浏览器在真正发起HTTP（s）请求前， 通常都会做一次DNS解析
- 一条命令
    ping www.baidu.com 递归查找的过程，结果IP

- dns 解析的过程
    url 输入， 到页面显示的第一个表达
    - 补充url 的完整性
    - dns 浏览器缓存
        chrome://net-internals/#dns
        第一次访问的， 需要解析， 否则使用缓存的
    - 操作系统dns缓存
        ipconfig / displaydns
    - hosts 文件配置
        指定域名 解析IP 手动配置
        加一行配置记录 指定ip 域名
        比如我们会将项目本地ip 配公司的域名, 那么开发效果就同线上域名效果一样。更安全
        开发中经常用

- 如果上面三者都没有，也就是没有命中缓存
    递归解析器查询。

