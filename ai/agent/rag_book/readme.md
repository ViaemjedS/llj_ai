# RAG 电子书

- 一本电子书， 如何做rag 

- RAG 的流程
1. 知识库
2. @langchain/community
    来自社区的各种loader
3. Splitter
4. Document
    pageContent
    meta: 
5. Embedding Model
6. Milvus

## 开发流程
- ensureBookCollection
    - 判断集合是否纯在 hasCollection
    - 判断集合 createCollection
        schema
    - 创建索引
    - 加载集合 loadCollection
    
