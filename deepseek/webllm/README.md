# WebLLM 项目
## 项目结构

## 运行项目
直接在浏览器中打开`index.html`文件即可

## 服务器端返回
- 输入url 或者点击一个链接(死板)
- 向服务器端发送请求
- node/java 请求，去数据库取数据，生成 html 字符串
- 返回html 字符串
## fetch 请求
- 滚动到底部后，加载更多数据 web2.0 富应用体验
- fetch url
    - 不需要刷新页面， 主动去服务器端取一次, DOM 更新页面
- 点赞的时候？？
  js fetch api like

- LLM AI 时代
  fetch 取来大模型

## http 请求
    - 请求行 GET http://www.baidu.com
            POST https://api.deepseek.com/
    - 请求头
        设置各种头部信息
        {
            "Content-Type": "application/json",
            "Authorization": "Bearer xxx"凭证
        }
    - 请求体
      GET 没有请求体
      POST 可以由请求体