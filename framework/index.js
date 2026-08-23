import { createElement } from "./dom.js";
import { render } from "./render.js";

const app = createElement(
    "div",
    {
        id: "app",
        class: "container"
    },

    createElement(
        "h1",
        { class: "title" },
        "My Mini Framework"
    ),

    createElement(
        "p",
        {},
        "Built without React!"
    )
);

const realDOM = render(app);

document.getElementById("app").appendChild(realDOM);