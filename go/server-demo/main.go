package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	// 输出写入网络或文件输出流
	fmt.Fprintf(w, "Hello Go")
}

func main() {
	// 注册路由处理函数 ，当访问指定路径时，执行对应的处理函数。
	http.HandleFunc("/", handler) 
	// 启动 HTTP 服务器 ，监听指定端口，接收并处理请求。
	http.ListenAndServe(":8080", nil)
}