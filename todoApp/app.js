import {createElement,render,changeDOM,createState,createRouter} from "../framework/index.js";
import { Header } from "./components/Header.js";
import { TodoList } from "./components/TodoList.js";
import { Footer } from "./components/Footer.js";
import { Info } from "./components/Info.js";

const root = document.querySelector("#root");
let oldVNode = null;

const store = createState({
    todos: [],
    filter: "all"
});


const router = createRouter({
    "/": () => {
        store.setState({
            filter: "all"
        });
    },

    "/active": () => {
        store.setState({
            filter: "active"
        });
    },

    "/completed": () => {
        store.setState({
            filter: "completed"
        });
    }

});


function addTodo(title) {
    const state = store.getState();
    const todo = {
        id: Date.now(),
        title,
        completed: false,
        editing: false
    };

    store.setState({
        todos: [
            ...state.todos,
            todo
        ]
    });
}


function toggleTodo(id) {
    const state = store.getState();
    const todos = state.todos.map(todo => {
        if (todo.id === id) {
            return {
                ...todo,
                completed: !todo.completed
            };
        }

        return todo;
    });

    store.setState({
        todos
    });
}


function deleteTodo(id) {
    const state = store.getState();
    const todos = state.todos.filter(
        todo => todo.id !== id
    );

    store.setState({
        todos
    });
}

function toggleAll() {
    const state = store.getState();
    const allCompleted = state.todos.every(todo => todo.completed);

    const todos = state.todos.map(todo => ({
        ...todo,
        completed: !allCompleted
    }));

    store.setState({
        todos
    });
}


function clearCompleted() {
    const state = store.getState();
    const todos = state.todos.filter(todo => !todo.completed);
    store.setState({
        todos
    });
}


function startEdit(id) {
    const state = store.getState();
    const todos = state.todos.map(todo => ({
        ...todo,
        editing: todo.id === id
    }));

    store.setState({
        todos
    });

    const editInput = root.querySelector(".todo-list li.editing .edit");
    if (editInput) {
        editInput.focus();
        editInput.setSelectionRange(editInput.value.length, editInput.value.length);
    }
}


function saveEdit(id, value) {
    const title = value.trim();

    if (!title) {
        deleteTodo(id);
        return;
    }

    const state = store.getState();
    const todos = state.todos.map(todo => {

        if (todo.id === id) {
            return {
                ...todo,
                title,
                editing: false
            };
        }

        return todo;
    });

    store.setState({
        todos
    });
}


function cancelEdit(id) {
    const state = store.getState();

    const todos = state.todos.map(todo => {

        if (todo.id === id) {
            return {
                ...todo,
                editing: false
            };
        }

        return todo;
    });

    store.setState({
        todos
    });
}


function getVisibleTodos(state) {

    if (state.filter === "active") {
        return state.todos.filter(
            todo => !todo.completed
        );
    }

    if (state.filter === "completed") {
        return state.todos.filter(
            todo => todo.completed
        );
    }

    return state.todos;
}


function App() {
    const state = store.getState();
    const visibleTodos = getVisibleTodos(state);
    const remaining = state.todos.filter( todo => !todo.completed).length;
    const hasCompleted = state.todos.some(todo => todo.completed) ;
    const allCompleted = state.todos.length > 0 && state.todos.every(todo => todo.completed);
    const appChildren = [ Header(addTodo)];

    if (state.todos.length > 0) {
        appChildren.push(
            TodoList(visibleTodos,allCompleted,
                {
                    currentRoute: router.currentRoute,
                    onToggle: toggleTodo,
                    onDelete: deleteTodo,
                    onToggleAll: toggleAll,
                    onStartEdit: startEdit,
                    onSaveEdit: saveEdit,
                    onCancelEdit: cancelEdit
                }
            )
        );
        appChildren.push(
            Footer(remaining,state.filter,hasCompleted && visibleTodos.length > 0 && state.filter !== "active",router,clearCompleted)
        );
    }


    return createElement(
        "div",
        { class: "todo-page" },

        createElement(
            "section",
            { class: "todoapp" },
            appChildren
        ),

        Info()
    );
}


function updateScreen() {
    const newVNode = App();
    if (oldVNode === null) {
        root.appendChild(render(newVNode));

    } else {
        changeDOM(root,newVNode,oldVNode);
    }
    oldVNode = newVNode;
}


store.addStateListener(() => {
    updateScreen();
});


updateScreen();
router.changeRoute();