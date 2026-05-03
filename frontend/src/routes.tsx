import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout.tsx";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";

const routes = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            { path: "playground", Component: Dashboard },
        ],
    },
]);

export default routes;