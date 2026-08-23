import { render } from "./render.js";

export function patch(parent, newVNode, oldVNode, index = 0) {
    if (!parent) {
        return;
    }

    const element = parent.childNodes[index];

    // Element didn't exist before
    if (!oldVNode) {
        parent.appendChild(render(newVNode));
        return;
    }

    // Element was removed
    if (!newVNode) {
        if (element) {
            parent.removeChild(element);
        }
        return;
    }

    // Element changed
    if (changed(newVNode, oldVNode)) {
        if (element) {
            parent.replaceChild(render(newVNode),element);
        }
        return;
    }

    // Same element -> compare children
    if (newVNode.tag !== null && element) {
        const maxChildren = Math.max(newVNode.children.length,oldVNode.children.length);
        for (let i = 0; i < maxChildren; i++) {
            patch(element,newVNode.children[i],oldVNode.children[i],i);
        }
    }
}

function changed(newVNode, oldVNode) {
    // Both are text nodes
    if (newVNode.tag === null && oldVNode.tag === null) {
        return newVNode.text !== oldVNode.text;
    }
    // HTML tag changed
    return newVNode.tag !== oldVNode.tag;
}