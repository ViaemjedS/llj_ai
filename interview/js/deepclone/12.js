let arr1 = [
    a=1,
    b={
        c: 1,
    },
    function() {
        console.log('函数拷贝不了')
    }
]
let arr2 = JSON.parse(JSON.stringify(arr1));
arr2[1].c = 2;
console.log(arr1,arr2);