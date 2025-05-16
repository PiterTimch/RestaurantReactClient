import {Link} from "react-router-dom";

const MainNavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Restaurant</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Перегляд</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/categoryCreate">Додати</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default MainNavBar;