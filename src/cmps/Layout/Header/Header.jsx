import { NavLink, Link } from "react-router-dom";
export function Header() {
    return (
        <header className="app-header">
            <section className="container">
                <h1 className="logo"><Link to="/">(B)mail</Link></h1>
                <nav>
                    <ul className="clean-list">
                        <li>
                            <NavLink to="/mail">Mail</NavLink>
                            <NavLink to="/about">About</NavLink>
                        </li>
                    </ul>
                </nav>
            </section>
        </header>
    )
}