# 机器学习
- notebookllm
  你不知道的JavaScript 深入学习
  AI 博客

- modelscope 模型
  阿里开源大模型社区
- python notebook
  ipynb 后缀 ---- 意思就是python notebook 格式
  nlp 机器学习

- python
  nlp 第一语言
  js 也挺好

- 引入了pipeline  模块
  
  scope 范围
  model 魔塔中国第一大模型社区
  
  from modelscope.pipelines import pipeline
  from modelscope.utils.constant import Tasks
  
  semantic_cls = pipeline(Tasks.text_classification,
  'damo/
  nlp_structbert_sentiment-classification_chinese-base')

  打分 label分类
  result = semantic_cls(input='轩宇的笛子吹得不错')