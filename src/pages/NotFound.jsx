import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div>
            <h2>404 Not Found</h2>
            <p>{"Sorry, we couldn't find that page."}</p>
            <Link to="/">Home</Link>
        </div>
    )
}