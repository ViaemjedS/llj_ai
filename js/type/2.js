console.log(0/0);
// 平方根 NaN
console.log(Math.sqrt(-1)); // NaN js 内置Math 对象
console.log(parseInt("a123")); // 将字符串转为数字 NaN
console.log(parseInt("123a")); // 将字符串转为数字 123
console.log(Number(undefined)); // NaN
console.log(NaN === NaN);   // false Not a Number 的方式有很多种
console.log(isNaN(NaN), isNaN(0/0)); // true
console.log(typeof NaN); // number

