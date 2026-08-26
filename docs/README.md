# Dilmun Framework

Dilmun is a small JavaScript framework that behave like a React library. It provides element creation, DOM rendering and updating, state management, event handling, and Routing.

## Getting started

Import the features you need from `framework/index.js`:

```js
import {
    createElement,
    render,
    changeDOM,
    createState,
    createRouter
} from "../framework/index.js";
```

Serve the project directory with any static HTTP server, then open
`todoApp/index.html`. For example:

```sh
python3 -m http.server 8000
```

The Todo app will be available at
`http://localhost:8000/todoApp/`.

Also, you can run the tests in `testing/index.html` to see the framework in action.

## Creating elements

`createElement(tag, attributes, ...children)` returns a virtual DOM object.
Text and numbers passed as children are automatically converted to text nodes.

```js
const title = createElement("h1", {}, "Test Framework");
document.querySelector("#root").appendChild(render(title));
```

The framework uses virtual objects so it can compare the old and new interface and update only the parts of the real DOM that changed.

## Attributes, events, and nesting

Attributes are passed in the second argument. Event names start with `on`, such
as `onclick`, `onchange`, or `onkeydown`, and receive a handler function.
Children are passed after the attributes, which makes nesting elements direct.

```js
const card = createElement(
    "section",
    { class: "task-card", id: "task-1" },
    createElement("h2", {}, "Learn Dilmun"),
    createElement(
        "button",
        {
            class: "complete-button",
            onclick: () => alert("Completed")
        },
        "Complete"
    )
);
```

Event attributes are translated into browser event listeners by the renderer.
During an update, changed listeners and attributes are removed or replaced so
the real DOM stays synchronized with the latest virtual tree.

## Updating the DOM

Keep the previous virtual tree and pass both versions to `changeDOM`:

```js
const root = document.querySelector("#root");
let oldTree = createElement("p", {}, "Before");
root.appendChild(render(oldTree));

const newTree = createElement("p", { class: "updated" }, "After");
changeDOM(root, newTree, oldTree);
oldTree = newTree;
```

`changeDOM` recursively compares tags, text, attributes, events, and children.
It replaces a node only when necessary and otherwise patches the existing node.

## State management

`createState` stores shared application data. `setState` shallowly merges an
update and then calls every registered listener.

```js
const store = createState({ count: 0 });

store.addStateListener(state => {
    console.log(state.count);
});

store.setState({ count: store.getState().count + 1 });
```

Listeners are useful for rebuilding the virtual tree whenever state changes.

## Routing

`createRouter` connects URL hash paths to functions. This keeps the visible
view or application state synchronized with the URL.

```js
const router = createRouter({
    "/": () => store.setState({ page: "home" }),
    "/active": () => store.setState({ page: "active" })
});

router.changeRoute();
router.navigate("/active");
```

Call `changeRoute()` once after setup. It resolves the current route immediately
and again whenever the URL hash changes.

## Project structure

```text
framework/   Framework source and public exports
todoApp/     TodoMVC example built with the framework
docs/        Framework documentation
```
