import {Link, Outlet} from "react-router-dom";
import {useAuthStore} from "../../store/authStore";

const Layout = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    return (
        <div className={"container"}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Restaurant</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/categories/">Категорії</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <div className="navbar">
                                    {user ? (
                                        <div className="flex items-center gap-2">
                                            <img src={`http://localhost:5116/images/50_${user.image}`} alt="Avatar" className="rounded-circle mx-3" />
                                            <span className={"mx-3"}>{user.email}</span>
                                            <button className={"mx-3 btn btn btn-light"} onClick={logout}>Вийти</button>
                                        </div>
                                    ) : (
                                        <Link className="nav-link btn btn-dark" to="/account/login">Увійти</Link>
                                    )}
                                </div>
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