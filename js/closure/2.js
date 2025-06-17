// 函数对象
function add() {
    // agruments 函数运行时决定，参数总管
    // 下标访问第几个参数 数组
    // console.log(arguments.map(item => item + 1));
    // 类数组， 有length 属性， for，但是没有数组的太多方法
    // 类数组转数组
    const args = Array.from(arguments);
    console.log(Object.prototype.toString.call(args));
    let result = 0;
    console.log(args, args.length, Object.prototype.toString.call(args),'/////');
    for (let i = 0; i < args.length; i++) {
        console.log(args[i]);
        result += args[i];
        // += 操作符会先读取变量值（触发错误），而单纯的 = 赋值会隐式创建全局变量
    }
    return result;
    // return a + b + c;
}
console.log(add.length);
console.log(add(1, 2, 3));

