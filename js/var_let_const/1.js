//代码 编译阶段,
//  一刹那， 语法检测。
//  执行阶段
// 会提升到当前作用域的顶部, 但是不会赋值

// 变量提升是面试官喜欢的，js开发者设计的，
// 但它不好，代码的执行结果和代码的阅读顺序不一致，有歧义
// 糟粕，避开
// ES6 声明变量不再使用var，用let
showName(); // 驼峰式命名
console.log(myName);

var myName = '张三';
function showName() {
    console.log('函数执行了');
}