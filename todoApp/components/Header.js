import { createElement } from "../../framework/index.js";

export function Header(onAddTodo) {
    return createElement(
        "header",
        { class: "header" },
        createElement(
            "div",
            { class: "brand" },
            createElement(
                "div",
                {},
                createElement(
                    "h1",
                    {},
                    "Todo-App"
                ),
                createElement(
                    "p",
                    { class: "subtitle" },
                    "Keep your day organized."
                )
            )
        ),

        createElement(
            "div",
            { class: "input-wrapper" },
            createElement(
                "i",
                { class: "fas fa-plus" }
            ),
            createElement(
                "input",
                {
                    class: "new-todo",
                    placeholder: "What needs to be done?",
                    autofocus: true,
                    onkeydown: event => {
                        if (event.key !== "Enter") {
                            return;
                        }
                        const title = event.target.value.trim()
                        if (!title) {
                            return;
                        }
                        onAddTodo(title);
                        event.target.value = "";
                    }
                }
            )
        )
    );
}
