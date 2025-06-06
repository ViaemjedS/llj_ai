// console.log('WebLLM 项目已启动');
// js 主动的去拉取http 接口
// web 1.0 时代 html/css/js 服务器端Java 返回的 js 只做简单的交互
// web 2.0 时代 js 主动的请求
// fetch('https://api.github.com/users/shunwuyu/repos')
//   .then(res => res.json())
//   .then(data => {
//     console.log(data);
//     document.querySelector('#reply').innerHTML += data.map(repo =>`
//     <ul>
//       <li>${repo.name}</li>
//     </ul> 
//     `).join('')
//   })
// 当LLM API 服务
// chat 方式 AIGC 生成/完成 返回的内容
// 由openai 制定的

// https 加密的htpp 更安全
// /chat 聊天的方式 messages
const endpoint = "https://api.deepseek.com/chat/completions"
// 请求头
const headers = {
    // 内容类型
    'Content-Type' : 'application/json',
    // 授权
    Authorization : `Bearer 123`
}

// 请求体
const payload = {
    model : 'deepseek-chat',
    // chat 三种方式
    // 1. 系统角色 只会出现一次 设置系统角色 开始会话时
    // 2. 用户角色 user 提问
    // 3. 助手角色
    messages: [
        {role : 'system', content: 'You are a helpful assistant'}
        ,{role :'user', content: '你好 Deepseek'}
    ]
}

fetch(endpoint, {
    method:'POST',
    headers: headers,
    // http  请求传输只能是字符串， 二进制流
    body: JSON.stringify(payload)
    // 请求 + LLM 生成需要花时间
    // http 是基于请求响应的简单协议
    // 返回的也是文本或二进制流
}).then(res => res.json())
// 解析返回的json 数据 也要花时间
.then(data => {
    console.log(data);
    document.querySelector('#reply').innerHTML
    = data.choices[0].message.content
})