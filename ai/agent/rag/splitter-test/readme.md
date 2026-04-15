# Splitter 理解

- loader 加载的大Document
    pdf doc 不是一个类型
- RecursiveCharacterTextSplitter
    Text 
- splitter
    character 按这个切  符合语义
    ["。","，","？","！"]
    优先级 。最优先
    chunk_size 的靠近 递归尝试, ? !
    保持语义
    切断 overlap(重复) 牺牲一定的空间(chunk_size 10%) 重复

    先character 切 再 chunkSize 最好 Overlap 

- RAG 问题
    - 流程
    - loader
    - splitter 细节 三个参数
    - splitter 面向对象体系和关系
        父类 TextSplitter 切割的是文本, MP3,MP4 不适合
        一系列的子类 CharacterTextSplitter 按字符切割
        TokenTextSplitter 按token切割
        RecursiveTextSplitter 语义的完整性特别好
            
            MarkdownTextSplitter 为什么属于RecursiveTextSplitter
            # ## ### 递归


