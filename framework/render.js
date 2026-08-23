export function render(vnode) {
    // Handle text nodes
    if (vnode.tag === null) {
        return document.createTextNode(vnode.text);
    }

    const element = document.createElement(vnode.tag);
    // Add attributes
    for (const [key, value] of Object.entries(vnode.attrs)) {
        element.setAttribute(key, value);
    }
    // Render childs recursively
    vnode.children.forEach(child => {
        element.appendChild(render(child));
    });

    return element;
}