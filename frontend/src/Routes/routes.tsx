import { createBrowserRouter } from "react-router";
import Home from "../pages/home";
import Dashboard from "../pages/dashboard";

const routes = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
    {
        path: "/dashboard",
        Component: Dashboard
    }
]);

export default routes;