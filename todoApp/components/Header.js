import { createElement } from "../../framework/index.js";

export function Header() {
    return createElement(
        "header",
        { class: "header" },

        createElement(
            "div",
            { class: "brand" },

            createElement(
                "span",
                { class: "brand-icon" },
                createElement("i", { class: "fa fa-check" })
            ),

            createElement(
                "div",
                {},

                createElement(
                    "h1",
                    {},
                    "My Tasks"
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
                { class: "fa fa-plus" }
            ),

            createElement(
                "input",
                {
                    class: "new-todo",
                    placeholder: "What needs to be done?",
                    autofocus: true
                }
            )
        )
    );
}