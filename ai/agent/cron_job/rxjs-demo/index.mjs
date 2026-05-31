
// 观察者模式是经典的设计模式
import {
    Observable
} from 'rxjs';

// 创建了一个Observable 对象
// 参数是一个回调函数
// subscribe 观察者对象
const stream = new Observable((subscribe) => {
    // next发送数据
    // complete 完成数据流
    subscribe.next('hello');
    subscribe.next('world');
    subscribe.complete();
})

// 订阅数据流
stream.subscribe((value) => {
    // 观察者函数
    console.log(value);
})