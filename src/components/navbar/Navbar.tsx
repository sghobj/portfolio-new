import './Navbar.scss'

export const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-md">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/cv">CV</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}