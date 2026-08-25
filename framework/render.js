export function render(vnode) {
    // Handle text nodes
    if (vnode.tag === null) {
        return document.createTextNode(vnode.text);
    }

    const element = document.createElement(vnode.tag);
    // Add attributes
    for (const [key, value] of Object.entries(vnode.attrs)) {
        isEvent(key) ? addEvent(element, key, value) : setAttribute(element, key, value);
    }
    // Render childs recursively
    vnode.children.forEach(child => {
        element.appendChild(render(child));
    });

    return element;
}

function setAttribute(element, key, value) {
    if (key === "checked") {
        element.checked = Boolean(value);
        return;
    }

    if (key === "value") {
        element.value = value ?? "";
        return;
    }

    if (value === false || value === null || value === undefined) {
        element.removeAttribute(key);
        return;
    }

    element.setAttribute(key, value);
}

export function isEvent(key) {
    return key.startsWith("on");
}

export function getEventType(eventName) {
    return eventName.slice(2).toLowerCase();
}

export function addEvent(element, eventName, handler) {
    const eventType = getEventType(eventName);
    element.addEventListener(eventType,handler);
}

export function removeEvent(element,eventName,handler) {
    const eventType = getEventType(eventName);
    element.removeEventListener(eventType,handler);
}
