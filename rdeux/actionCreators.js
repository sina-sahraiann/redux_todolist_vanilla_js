import { addTodo, doTodo, removeTodo, getAllTodos } from './actions.js';


const addTodoAction = (title) => {
    return {
        type: addTodo,
        title
    }
}

const removeTodoAction = (id) => {
    return {
        type: removeTodo,
        id
    }
}

const doTodoAction = (id) => {
    return {
        type: doTodo,
        id
    }
}

const getAllTodosAction = () => {
    return {
        type: getAllTodos,
    }
}

export { addTodoAction, removeTodoAction, doTodoAction,getAllTodosAction }