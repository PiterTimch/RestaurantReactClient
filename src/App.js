import './App.css';
import CategoriesPage from "./pages/categories";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import NoMatch from "./pages/NoMatch";
import CategoriesCreateForm from "./pages/categories/Create";
import Home from "./pages/Home";
import CategoriesUpdateForm from "./pages/categories/Update";
import Login from "./pages/account/Login";
import LoginAccountForm from "./pages/account/Login";
import {useEffect} from "react";
import {useAuthStore} from "./store/authStore";
import {jwtDecode} from "jwt-decode";
import ProductItemPage from "./pages/products/Item";
import ProductsListPage from "./pages/products/List";

const App = () => {
    const setUser = useAuthStore((state) => state.setUser);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            try {
                const decoded = jwtDecode(token);

                if (decoded.exp * 1000 > Date.now()) {
                    setUser(decoded);
                } else {
                    localStorage.removeItem("jwt");
                }
            } catch (e) {
                console.error("Invalid token", e);
                localStorage.removeItem("jwt");
            }
        }
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />}/>

                    <Route path="categories">
                        <Route index element={<CategoriesPage />} />
                        <Route path="create" element={<CategoriesCreateForm />} />
                        <Route path="update/:slug" element={<CategoriesUpdateForm />} />
                    </Route>

                    <Route path="products">
                        <Route path="list/" element={<ProductsListPage/>}></Route>
                        <Route path="list/:slug" element={<ProductItemPage/>}></Route>
                    </Route>

                    <Route path={"account"}>
                        <Route path={"login"} element={<LoginAccountForm/>}/>
                    </Route>

                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;