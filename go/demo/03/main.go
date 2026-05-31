package main

import "fmt"

func main() {
	// chan 通道 主线程和协程之间通信的通道
	// 传递数据的类型是整型
	// 创建一个传输整数的通道，让不同的 goroutine 可以安全地发送和接收数据，实现并发通信！
	ch := make(chan int)

	go func() {
		ch <- 100
	}()
	// 从通道中接收数据
	// 阻塞主线程 等待协程完成
	
	num := <- ch

	fmt.Println(num)
}