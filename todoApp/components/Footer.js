import { createElement } from "../../framework/index.js";

export function Footer(remaining,filter,hasCompleted,router,onClearCompleted) {
    const children = [
        createElement(
            "span",
            { class: "todo-count" },
            createElement(
                "strong",
                {},
                remaining
            ),
            remaining === 1 ? " item left" : " items left"
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
                        class: filter === "all" ? "selected" : "",
                        onclick: () => {
                            router.navigate("/");
                        }
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
                        href: "#/active",
                        class: filter === "active" ? "selected" : "",
                        onclick: () => {
                            router.navigate("/active");
                        }
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
                        href: "#/completed",
                        class:filter === "completed" ? "selected" : "",
                        onclick: () => {
                            router.navigate("/completed");
                        }
                    },
                    "Completed"
                )
            )
        )
    ];

    if (hasCompleted) {
        children.push(
            createElement(
                "button",
                {
                    class: "clear-completed",
                    onclick: onClearCompleted
                },
                "Clear completed"
            )
        );
    }

    return createElement(
        "footer",
        { class: "footer" },
        children
    );
}