import React, { useState, useEffect } from 'react';
import {
  // 移动应用 没有WebView 没有浏览器 
  // 原生UI 
  // UI html， android， ios UI 语言
  StyleSheet,
  View,  // div  WebView 浏览器
  FlatList,  

} from 'react-native';
import {
  Provider as PaperProvider,
  TextInput,
  Button,
  Checkbox,
  List
} from 'react-native-paper'; // 组件库
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (!task.trim()) return;
    setTodos([
      ...todos, 
      { 
        id: Date.now().toString(), 
        text: task, 
        done: false 
      }
    ]);
    setTask('');
  }
  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  }
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  // mounted
  useEffect(() => {
    AsyncStorage.getItem("todos").then(data => {
      if (data) {
        setTodos(JSON.parse(data));
      }
    })
  }, []);

  // update
  useEffect(() => {
    AsyncStorage.setItem("todos",JSON.stringify(todos));
  },[todos])
  const renderItem = ({item}) => (
    <List.Item
      title={item.text}
      left={
        () => (
          <Checkbox
            status={item.done?'checked':'unchecked'}
            onPress={() => toggleTodo(item.id)}
          />
            
        )
      }
      right={() => (
        <Button onPress={() => deleteTodo(item.id)}>delete</Button>
      )}
    >

    </List.Item>
  )

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* 更好看 */}
        <TextInput
          label="Add a new todo"
          value={task}
          onChangeText={setTask}
        />
        <Button onPress={addTodo} style={styles.addButton}>Add</Button>
        {/* 不是网页，移动App 特别注重性能  虚拟列表*/}
        <FlatList 
          data={todos}
          keyExtractor={(item) => item.id}
          style={styles.list}
          renderItem={renderItem}
        />
      </View>
    </PaperProvider>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: 'skyblue',
  },
  input: {
    marginBottom: 10,
 },
  addButton: {
    marginBottom: 20,
  },
  list: {
    flex: 1,
  }
})