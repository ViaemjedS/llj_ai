const target = {
    a: 1
}
const source = {
    // 对象的嵌套
    b: {
        name: 'hxt',
        hobbies: ["篮球","达瓦"]
    },
    c: 1
}

// 如果是源对象是简单数据类型， 忽略
Object.assign(target, null);
Object.assign(target,undefined);
console.log(target);
// Object.assign(undefined,{a: 1});

const obj = {name: "张三"};
Object.assign(obj);