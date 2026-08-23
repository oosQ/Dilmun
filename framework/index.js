import { createElement } from "./dom.js";
import { render } from "./render.js";
import { createState } from "./state.js";
import { patch } from "./patch.js";

const root = document.querySelector("#root");

const variables = createState({
    count: 0
});

let oldVNode = null;

function App() {

    return createElement(
        "button",
        {
            onclick: () => {

                const current =
                    variables.getState().count;

                variables.setState({
                    count: current + 1
                });
            }
        },

        "+1",

        createElement(
            "span",
            {},
            ` Count: ${variables.getState().count}`
        )
    );
}

function updateScreen() {
    const newVNode = App();
    if (oldVNode === null) {
        root.appendChild(render(newVNode));
    } else {
        patch(root,newVNode,oldVNode);
    }
    oldVNode = newVNode;
}

variables.addStateListener(() => {
    updateScreen();
});

updateScreen();