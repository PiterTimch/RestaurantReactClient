import {Link, Outlet, useNavigate} from "react-router-dom";
import {useAuthStore} from "../../store/authStore";
import {BASE_URL} from "../../api/apiConfig";

const Layout = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

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
                            <li className="nav-item">
                                <Link className="nav-link" to="/products/list/">Страви</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <div className="navbar">
                                    {user ? (
                                        <div className="flex items-center gap-2">
                                            <img src={`${BASE_URL}/images/50_${user.image}`} alt="Avatar" className="rounded-circle mx-3" />
                                            <span className={"mx-3"}>{user.email}</span>
                                            <button className={"mx-3 btn btn btn-light"} onClick={handleLogout}>Вийти</button>
                                        </div>
                                    ) : (
                                        <>
                                            <Link className="btn btn-dark mx-3" to="/account/login">Увійти</Link>
                                            <Link className="btn btn-primary" to="/account/register">Зареєструватися</Link>
                                        </>
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