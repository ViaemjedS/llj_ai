// 声明模块
package main

// 内置模块 fmt 格式化输出
import "fmt"

func add(a int, b int) int {
	return a + b
}

// func 函数
func main() {
	fmt.Println("Hello Go")
	// var name string = "你好"
	// GO 是强类型语言 var 显示声明类型
	// := 声明是已被推断为整型
	age := 18
	// age = 19
	// age = "22"
	if age >= 18 {
		fmt.Println("adult")
	}

	// 循环 没有while
	for i := 0; i < 10; i++ {
		fmt.Println(i)
	}

	// 数组 固定长度
	// arr := [3]int{1, 2, 3}
	// 切片 动态数组
	slice := []int{1, 2, 3}
	slice = append(slice, 4)

	m := map[string]int{"a": 1, "b": 2}
	fmt.Println(m["a"])
	// GO 里面没有 class 
	// 结构体	
	type User struct {
		Name string
		Age  int
	}
	u := User{Name: "Andrew", Age: 18}
	
	// 并发
	
}

// 指针
func updateAge(age *int) {
	*age = 20
}