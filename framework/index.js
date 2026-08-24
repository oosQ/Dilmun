import { createElement } from "./dom.js";
import { render } from "./render.js";
import { changeDOM } from "./changer.js";
import { createState } from "./state.js";
import { createRouter } from "./router.js";

const root = document.querySelector("#root");
let oldVNode = null;

const store = createState({
    todos : [],
    filter: "all"
});

const router = createRouter({
    "/": () => {
        store.setState({
            filter: "all"
        });
    },

    "/active": () => {
        store.setState({
            filter: "active"
        });
    },

    "/completed": () => {
        store.setState({
            filter: "completed"
        });
    }
});

function App() {
    const state = store.getState();

    return createElement(
        "div",
        {},

        createElement(
            "h1",
            {},
            `Current filter: ${state.filter}`
        ),

        createElement(
            "button",
            {
                onclick: () => router.navigate("/")
            },
            "All"
        ),

        createElement(
            "button",
            {
                onclick: () => router.navigate("/active")
            },
            "Active"
        ),

        createElement(
            "button",
            {
                onclick: () => router.navigate("/completed")
            },
            "Completed"
        )
    );
}

function updateScreen() {
    const newVNode = App();
    if (oldVNode === null) {
        root.appendChild(render(newVNode));
    } else {
        changeDOM(root,newVNode,oldVNode);
    }
    oldVNode = newVNode;
}

store.addStateListener(() => {
    updateScreen();
});

updateScreen();
router.changeRoute();