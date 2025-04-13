import './Navbar.scss'
import {useState} from "react";

export const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleNavbar = () => {
        setIsCollapsed(!isCollapsed);
    };
    return (
        <>
            <nav className={`navbar navbar-expand-xs ${isCollapsed ? 'collapsed-navbar' : ''}`}>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#collapsingNavbar4" aria-controls="navbarToggler" aria-expanded="false"
                        onClick={toggleNavbar}
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsingNavbar4">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cv">CV</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}