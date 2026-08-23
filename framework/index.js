import { createElement } from "./dom.js";
import { render } from "./render.js";
import { createState } from "./state.js";

const variables = createState({
    count: 0
});

function App() {
    return createElement(
        "button",
        {
            onclick: () => {
                const current = variables.getState().count;

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
    document.body.innerHTML = "";
    document.body.appendChild(render(App()));
}

variables.addStateListener(() => {
    updateScreen();
});

updateScreen();