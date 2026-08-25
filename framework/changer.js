import { render } from "./render.js";
import {isEvent,addEvent,removeEvent } from "./render.js";

export function changeDOM(parent, newVNode, oldVNode, index = 0) {
    if (!parent) return;
    const element = parent.childNodes[index];

    // Add new node if old node changed
    if (!oldVNode) {
        parent.appendChild(render(newVNode));
        return;
    }

    // Remove node if new node changed
    if (!newVNode) {
        if (element) {
            parent.removeChild(element);
        }
        return;
    }

    // replace node if tag or text changed
    if (isChanged(newVNode, oldVNode)) {
        if (element) {
            parent.replaceChild(render(newVNode),element);
        }
        return;
    }

    // Text nodes have no attrs or children
    if (newVNode.tag === null) {
        return;
    }

    // Update attributes and events
    updateAttributes(element,newVNode.attrs,oldVNode.attrs);

    // Compare children recursively
    const sharedChildren = Math.min(newVNode.children.length,oldVNode.children.length);

    for (let i = 0; i < sharedChildren; i++) {
        changeDOM(element,newVNode.children[i],oldVNode.children[i],i);
    }

    for (let i = sharedChildren; i < newVNode.children.length; i++) {
        element.appendChild(render(newVNode.children[i]));
    }

    for (let i = oldVNode.children.length - 1; i >= newVNode.children.length; i--) {
        if (element.childNodes[i]) {
            element.removeChild(element.childNodes[i]);
        }
    }
}

function isChanged(newVNode, oldVNode) {
    // Both are text nodes
    if (newVNode.tag === null && oldVNode.tag === null) {
        return newVNode.text !== oldVNode.text;
    }
    // One is text and the other is an HTML element
    if (newVNode.tag === null || oldVNode.tag === null) {
        return true;
    }
    // Different HTML tag
    return newVNode.tag !== oldVNode.tag;
}

function updateAttributes(element, newAttrs, oldAttrs) {
    // Remove attributes/events that no longer exist
    for (const [key, oldValue] of Object.entries(oldAttrs)) {
        if (!(key in newAttrs)) {
            if (isEvent(key)) {
                removeEvent(element,key,oldValue);
            } else {
                removeAttribute(element, key);
            }
        }
    }

    // Add/update attributes & events
    for (const [key, newValue] of Object.entries(newAttrs)) {
        const oldValue = oldAttrs[key];
        if (isEvent(key)) {
            if (oldValue !== newValue) {
                if (oldValue) {
                    removeEvent(element,key,oldValue);
                }
                addEvent(element,key,newValue);
            }
            continue;
        }
        if (oldValue !== newValue) {
            setAttribute(element,key,newValue);
        }
    }
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

function removeAttribute(element, key) {
    if (key === "checked") {
        element.checked = false;
        return;
    }

    if (key === "value") {
        element.value = "";
        return;
    }

    element.removeAttribute(key);
}
