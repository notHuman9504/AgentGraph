import { Outlet } from "react-router";
import Navbar from "../components/ui/Navbar.tsx";

export default function RootLayout() {
    return (
        <>
            <Navbar/>
            <main>
                <Outlet />
            </main>
        </>
    );
}