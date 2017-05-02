// escherpad has all these insertion points
const NAMESPACE = "core-app";
import Bootstrap from "./bootstrap"

// this is almost DI.
export default {
    namespace: NAMESPACE,
    requireReload: true,
    commands: {},
    reducer: {}, // or a function (s, a)=>s
    views: {
        _bootstrap: Bootstrap
    },
    viewAnchors: {},
    saga: {},
    config: (c) => c
}
