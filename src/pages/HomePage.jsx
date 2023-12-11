import { Link } from "react-router-dom";

export function HomePage() {
    return (
        <main className="home container flex column auto-center gap10">
            <h2>{"Hi, we're "}<strong>{"Bmail"}</strong></h2>
            <p>{"Your personal mail service for when your \"A\" plan fails"}</p><br />
            <Link className="primary-button inline-block" to="/mail">Get started</Link>
        </main>
    )
}