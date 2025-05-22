// 声明了对象常量
// 内存中开辟了一个空间，里面存放了一个对象
// wxy 取址 &
// js是弱类型语言
// = 赋值 Object
// 对象字面量 JSON
// JS 太灵活，不需要
const wxy = {
    name : '万玄玉',
    age : 19,
    tail : 170,
    hometown : '江西抚州'
};

wxy.giveFlowers = function (dx) {
    console.log(this.name + '给 ' + dx.name + '送花' );
}

const qiqi = {
    name : '楚琪琪',
    age : 18,
    receiveFlowers : function (dx) {
        console.log(this.name + '收到了' + dx.name + '的花');
    }
}
qiqi.receiveFlowers(wxy);

function foo(something) {  
    this.a = something; 
} 
var obj1 = {  
    foo: foo 
}; 
