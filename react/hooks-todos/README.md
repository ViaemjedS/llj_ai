## hooks todos
- 安排个css 亮点
  - stylus
    css 超集
  - 拥有vite 脚手架
      stylus 预编译 安装stylus
      vite 来自vue 社区
  - react 组件设计
    - 开发任务单元
    - 设计组件
        界面功能 状态 响应式
        - 新建todo 表单
        - 修改todo 列表
        - 删除
    - 按功能划分 粒度
      - form
      - list 列表
        - Item 组件  维护和**性能**

- 字体
  - 设置多个. 设备的支持(本地包含)
  - 苹果设备 -apple-system 前端负责用户体验，字体也是体验的一部分
  用户体验，字体也是体验的一部分
- rem
  - 相对单位
  - 移动端的重要单位 px 不要用了 绝对的
    移动端 宽高不定的 rem vw/vh 相对单位, em 相对于自身的font-size等比例
    使用相对单位，可以在所有设备上适配 .

- props 组件通信
  - 传递状态
  - 传递自定义事件
  - 直接解构
    const {
      todos
      onAddTodo
    } = props 单独解构
  

- 数据绑定
  - 变量 修改值
  - 数据状态
      - Data binding **数据**绑定 jsx 就是静态的
      {} 数据绑定
      - 数据和界面状态的统一
        - 界面由数据驱动的
        - 数据和界面状态的一致性
      - 响应式

- vue  和react区别
  - vue 好入门， api好用
  - react 倾向于原生js 入门难
    - hooks ?
  <input v-model="text"/> vue 双向绑定
  <input value={text} onChange={() => setText(text);}/>
   react 坚持 单向绑定

- 本地存储
  - localStorage html
  key : value 存储
  setItem(key, value)
  getItem(key)
  removeItem(key)
  - BOM Browser Object Model
  - DOM Document Object Model
- 本地存储
  - localStorage 和 cookie 区别
  -  http 无状态， head cookie 带上
  - 如果cookie 太大，影响http 性能 4kb
  - cookie 前端，后端都可以设置
      过期时间
      domain 隔离
  - localStorage 只在服务器端
    todos
    5MB
  - IndexDB 数据库 GB
## 自定义hooks
  - 自己定义的
  - use
  - 某一项功能
    简单函数的封装
    响应式的状态
    effect
    todos
- 自定义hooks
  - 现代react app 的架构一部分
  - hooks目录
      自定义hooks
      框架common 部分
      业务定制 a hooks
  - use开头
      state，effect 逻辑封装复用
  - return
      todos
      toggle
      addTodos
      deleteTodos
      函数式编程思想的体现
  - 组件更好的聚焦于模块渲染
  - 全面hooks函数式编程

- 两个遗憾
  - ../../ 路径山路18弯
      vite 配置alias 短路径
      resolve: {
        // 别名
        alias: {
          '@' : path.resolve(__dirname, './src'),
        },
      },
  - toggle、delete 跨越组件层级别有点多，
    useContext 跨组件层级
  
  


