import { createElement } from "../../framework/index.js";

export function Info() {
    return createElement(
        "footer",
        { class: "info" },

        createElement(
            "p",
            {},
            "Double-click to edit a todo"
        ),

        createElement(
            "p",
            {},
            "Built in Reboot01 institute"
        )
    );
}