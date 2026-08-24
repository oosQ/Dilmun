export function createRouter(routes) {
    function getRoute() {
        const main = window.location.hash || "#/";
        return main.slice(1);
    }

    function navigate(path) {
        window.location.hash = path;
    }

    function resolve() {
        const currentRoute = getRoute();
        if (routes[currentRoute]) {
            routes[currentRoute]();
        }
    }

    function changeRoute() {
        window.addEventListener("hashchange", resolve);
        resolve();
    }

    return {getRoute,navigate,changeRoute};
}