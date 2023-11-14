import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import './App.css';

const API_URL = 'https://laravel_todos_api.com/api/todos';

function App() {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get(API_URL)
            .then((response) => {
                setTodos(response.data.todos);
            });
    }, []);

    const deleteTodo = (todoId) => {
        axios.post(`${API_URL}/delete`, { id: todoId })
            .then(() => {
                const newTodos = todos.filter((todo) => todo.id !== todoId);
                setTodos(newTodos);
            });
    };

    const completeTodo = (todoId) => {
        axios.post(`${API_URL}/complete`, { id: todoId })
            .then(() => {
                const newTodos = todos.map((todo) => {
                    if (todo.id === todoId) {
                        return { ...todo, completed: !todo.completed };
                    }
                    return todo;
                });
                setTodos(newTodos);
            });
    };

    const createTodo = (content) => {
        axios.post(API_URL, { content })
            .then((response) => {
                setTodos([...todos, response.data.todo]);
            });
    };

    return (
        <div className="App">
            <AddTodo createTodo={createTodo} />
            <TodoList todos={todos} completeTodo={completeTodo} deleteTodo={deleteTodo} />
        </div>
    );
}

export default App;
