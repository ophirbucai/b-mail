import { Outlet } from "react-router-dom";
import { Footer } from "./Footer/Footer.jsx";
import { Header } from "./Header/Header.jsx";

export function Layout() {
    return (
        <div className="main-app">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}