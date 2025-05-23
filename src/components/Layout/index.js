import {Link, Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className={"container"}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Restaurant</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/categories/">Перегляд</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/categories/create">Додати</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <hr />

            <Outlet />
        </div>
    );
}
export default Layout;