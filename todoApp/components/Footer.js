import { createElement } from "../../framework/index.js";

export function Footer() {
    return createElement(
        "footer",
        { class: "footer" },

        createElement(
            "span",
            { class: "todo-count" },

            createElement(
                "strong",
                {},
                "0"
            ),

            " items left"
        ),

        createElement(
            "ul",
            { class: "filters" },

            createElement(
                "li",
                {},
                createElement(
                    "a",
                    {
                        href: "#/",
                        class: "selected"
                    },
                    "All"
                )
            ),

            createElement(
                "li",
                {},
                createElement(
                    "a",
                    {
                        href: "#/active"
                    },
                    "Active"
                )
            ),

            createElement(
                "li",
                {},
                createElement(
                    "a",
                    {
                        href: "#/completed"
                    },
                    "Completed"
                )
            )
        ),

        createElement(
            "button",
            {
                class: "clear-completed"
            },
            "Clear completed"
        )
    );
}