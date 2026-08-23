export function createState(initialState = {}) {
    let state = { ...initialState };
    const listeners = [];

    // returns the current state
    function getState() {
        return state;
    }

    // updates the state and notifies all listeners
    function setState(newState) {
        state = {
            ...state,
            ...newState
        };

        listeners.forEach(listener => {
            listener(state);
        });
    }

    function addStateListener(listener) {
        listeners.push(listener);
    }

    return {getState,setState,addStateListener};
}