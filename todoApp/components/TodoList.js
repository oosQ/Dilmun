import { createElement } from "../../framework/index.js";

export function TodoList() {
    return createElement(
        "section",
        { class: "main" },

        createElement(
            "input",
            {
                id: "toggle-all",
                class: "toggle-all",
                type: "checkbox"
            }
        ),

        createElement(
            "label",
            { for: "toggle-all" },
            "Mark all as complete"
        ),

        createElement(
            "ul",
            { class: "todo-list" }
        )
    );
}