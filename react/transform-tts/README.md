# React Transformer TextToSpeech

- transformer
    transform.js JS AI 机器学习库
    来自huggingface 全球最大开源大模型社区
    将模型下载到浏览器端 JS 开发者的智能战场未来

- 项目的亮点
    - 使用transformer.js 的 端模型
    - 使用tailwindcss   原子css 几乎不需要写样式了
        类名文档语义很好， 特别适合AI 生成
        高效解决适配 w-full + max-w-xl
    - webworker nlp 任务
        1. 延迟加载大模型
        2. 在实现组件后再实例化 有利于性能 
        3. 卸载时移除事件
    - 封装组件
- 项目的难点
    - 单例模式封装 MyTextToSpeechPipeline
    - getInstance 只实例化一次
    - 懒执行
    - Promise.all + nlp 流程的理解 (tokenizer、 model、 vscoder)