import { addTodoAction, doTodoAction, getAllTodosAction, removeTodoAction } from "./rdeux/actionCreators.js";
import { addTodo, doTodo, getAllTodos, removeTodo } from "./rdeux/actions.js"


const addBtn = document.getElementById('addBtn');
const textInputElm = document.getElementById('inputText');
const todoContainer = document.getElementById('todoContainer')
const filter = document.getElementById('filter')



const todoListReducer = (state = [], action) => {
    switch (action.type) {
        case addTodo: {
            const newState = [...state]
            const newTodoObject = {
                id: crypto.randomUUID(),
                title: action.title,
                isCompleted: false,
            }
            newState.push(newTodoObject)

            return newState
        }
        case removeTodo: {
            const copyState = [...state]
            const newState = copyState.filter(todo => action.id !== todo.id)
            return newState
        }
        case doTodo: {
            const newState = [...state]
            newState.some(todo => {
                if (action.id === todo.id) {
                    todo.isCompleted = !todo.isCompleted
                }
            })
            return newState
        }
        case getAllTodos:{
            return state
        }
        default: {
            return state
        }
    }
}

const todoListStore = Redux.createStore(todoListReducer)

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const inputValue = textInputElm.value.trim();
    todoListStore.dispatch(addTodoAction(inputValue));
    textInputElm.value = ''
    const todos = todoListStore.getState()
    generateTodoInDom(todos)
})

filter.addEventListener('change', (e) =>{
    todoListStore.dispatch(getAllTodosAction())
    let todos = todoListStore.getState()
    if (e.target.value === 'completed') {
        const completedTodos = todos.filter(todos => todos.isCompleted === true)
        generateTodoInDom(completedTodos)
    }
    if (e.target.value === 'incompleted') {
        const inCompletedTodos = todos.filter(todos => todos.isCompleted === false)
        generateTodoInDom(inCompletedTodos)
    }
    if (e.target.value === 'all') {
        generateTodoInDom(todos)
    }
})

const removeTodoHandler = (todoId) => {
    todoListStore.dispatch(removeTodoAction(todoId))
    const todos = todoListStore.getState()
    generateTodoInDom(todos)
}

const setCompeletedTodoHandler = (todoId) => {
    todoListStore.dispatch(doTodoAction(todoId))
    const todos = todoListStore.getState()
    console.log(todos);
    generateTodoInDom(todos)
}


window.removeTodoHandler = removeTodoHandler
window.setCompeletedTodoHandler = setCompeletedTodoHandler

const completed = ['opacity-50', 'text-decoration-line-through']

const generateTodoInDom = (todos) => {
    todoContainer.innerHTML = ''
    todoContainer.innerHTML = todos.map((todo) => {
        return (`
        <li class="d-flex align-items-center justify-content-between border border-1" >
                <div>
                    <div class=" ${todo.isCompleted && completed.join(' ')} fw-bold">
                            ${todo.title}
                    </div>
                     <i class="remove mdi mdi-close-circle-outline"></i>
                </div>
            <div class="btn-group">
                <button type="button" class="btn btn-danger " onclick=removeTodoHandler("${todo.id}")>
                    <i class="bi bi-trash-fill"></i>
                </button>
                <button type="button" class="btn btn-primary " onclick=setCompeletedTodoHandler("${todo.id}")>
                    <i class="bi bi-patch-check"></i>
                </button>
            </div>
        </li>
     `)
    })
}

