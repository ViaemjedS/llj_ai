// 让局部变量可以全局访问
function f1() {
    // 局部变量
    var n = 999;
    function f2() {
        console.log(n);
    }
    return f2;
}