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
	http.HandleFunc("/", handler) 
	http.ListenAndServe(":8080", nil)
}