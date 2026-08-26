export function createRouter(routes) {
    const router = {
        currentRoute: "/"
    };

    function getRoute() {
        const main = window.location.hash || "#/";
        return main.slice(1);
    }

    function navigate(path) {
        window.location.hash = path;
        router.currentRoute = path;
    }

    function resolve() {
        const currentRoute = getRoute();
        router.currentRoute = currentRoute;

        if (routes[currentRoute]) {
            routes[currentRoute]();
        }
    }

    function changeRoute() {
        window.addEventListener("hashchange", resolve);
        resolve();
    }

    router.getRoute = getRoute;
    router.navigate = navigate;
    router.changeRoute = changeRoute;

    return router;
}