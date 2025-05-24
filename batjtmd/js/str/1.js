/**
 * @func 反转字符串
 * @param {string} str
 * @return string
 */
// function reverseString(str) {
//     // str 是什么类型？ 字符串 简单数据类型 primitive


//     return str.split('').reverse().join('');
// }
// 函数表达式
// es5 函数表达式
const reverseString2 = function(str){
    return str.split('').reverse().join('');
};
// es6 箭头函数 简洁 function 不要了 用箭头 => 代替
// {}也省了 只有一句话的时候 可以省掉{}
// 它是返回值的时候 连return 都可以省略
// 当只有一个参数的时候 可以省掉()
const reverseString = str => str.split('').reverse().join('');

