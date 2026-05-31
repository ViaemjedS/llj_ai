// Object.defineProperty
var obj = {}; //对象
// es5 就提供的api
Object.defineProperty(obj, "num", {
    value: 1,
    // 属性描述符
    configurable: true,
    writable: false,
    enumerable: true,
    // get: function() {
    //     console.log('读取了属性');
    //     return 1;
    // }
})
// obj.num = 2;
// delete obj.num;
// console.log(obj.num);
for (let key in obj) {
    console.log(key + ': ' + obj[key]);
}
console.log(Object.getOwnPropertyDescriptor(obj, 'num'));
Object.defineProperty(obj, 'name', {
    writable: true
})
obj.name = '';
console.log(obj.name);

for (let key in obj) {
    console.log(key, obj[key]);
}