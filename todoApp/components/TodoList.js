import { createElement } from "../../framework/index.js";
import { TodoItem } from "./TodoItem.js";

export function TodoList(todos,allCompleted,handlers) {
    return createElement(
        "section",
        { class: "main" },

        createElement(
            "input",
            {
                id: "toggle-all",
                class: "toggle-all",
                type: "checkbox",
                checked: allCompleted,

                onchange: () => {
                    handlers.onToggleAll();
                }
            }
        ),

        todos.length != 0 && (handlers.currentRoute === "/active" || handlers.currentRoute === "/") ?
        createElement(
            "label",
            {
                for: "toggle-all"
            },
            "Mark all as complete"
        ) : "",

        createElement(
            "ul",
            { class: "todo-list" },

            todos.map(todo =>
                TodoItem( todo, handlers.onToggle, handlers.onDelete, handlers.onStartEdit, handlers.onSaveEdit, handlers.onCancelEdit)
            )
        )
    );
}