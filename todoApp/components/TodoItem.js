import { createElement } from "../../framework/index.js";

export function TodoItem( todo, onToggle, onDelete, onStartEdit, onSaveEdit, onCancelEdit) {
    const classes = [];

    if (todo.completed) {
        classes.push("completed");
    }

    if (todo.editing) {
        classes.push("editing");
    }

    const children = [
        createElement(
            "div",
            { class: "view" },

            createElement(
                "input",
                {
                    class: "toggle",
                    type: "checkbox",
                    checked: todo.completed,
                    onchange: () => {
                        onToggle(todo.id);
                    }
                }
            ),

            createElement(
                "label",
                {
                    ondblclick: () => {
                        onStartEdit(todo.id);
                    }
                },
                todo.title
            ),

            createElement(
                "button",
                {
                    class: "destroy",
                    title: "Delete",
                    onclick: () => {
                        onDelete(todo.id);
                    }
                },

                createElement(
                    "i",
                    {
                        class: "fas fa-times"
                    }
                )
            )
        )
    ];

    if (todo.editing) {
        children.push(
            createElement(
                "input",
                {
                    class: "edit",
                    value: todo.title,
                    onkeydown: event => {
                        if (event.key === "Enter") {
                            onSaveEdit(
                                todo.id,
                                event.target.value
                            );
                        }
                        if (event.key === "Escape") {
                            onCancelEdit(todo.id);
                        }
                    },

                    onblur: event => {
                        onSaveEdit(
                            todo.id,
                            event.target.value
                        );
                    }
                }
            )
        );
    }

    return createElement(
        "li",
        {
            class: classes.join(" ")
        },
        children
    );
}
