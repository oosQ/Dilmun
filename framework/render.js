export function render(vnode) {
    // Handle text nodes
    if (vnode.tag === null) {
        return document.createTextNode(vnode.text);
    }

    const element = document.createElement(vnode.tag);
    // Add attributes
    for (const [key, value] of Object.entries(vnode.attrs)) {
        isEvent(key) ? addEvent(element, key, value) : element.setAttribute(key, value);
    }
    // Render childs recursively
    vnode.children.forEach(child => {
        element.appendChild(render(child));
    });

    return element;
}

// Event handling functions
export function isEvent(key) {
    return key.startsWith("on");
}
export function addEvent(element, eventName, handler) {
    const eventType = eventName.slice(2).toLowerCase();

    element.addEventListener(eventType, handler);
}