package main

import (
	"fmt"
	"time"
)
func sayHello() {
	// 耗时性的任务
	fmt.Println("Hello Go")
}
func main() {
	// go 关键字 告诉go 运行时, 在后台
	// 开启一个新的轻量级的（协程） 来执行sayHello函数
	go sayHello()
	fmt.Println("main")
	// 阻塞主线程 等待协程执行完成
	time.Sleep(time.Second)
}