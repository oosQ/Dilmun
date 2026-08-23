export function createElement(tag, attrs = {}, ...children) {
    return {
        tag,
        attrs,
        children: children.flat().map(child => typeof child === "object" ? child : createTextElement(child))
    };
}

function createTextElement(text) {
    return {
        tag: null,
        attrs: {},
        children: [],
        text: String(text)
    };
}
