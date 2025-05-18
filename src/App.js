import './App.css';
import CategoriesPage from "./pages/categories";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import NoMatch from "./pages/NoMatch";
import CategoriesCreateForm from "./pages/categories/Create";
import Home from "./pages/Home";
import CategoriesUpdateForm from "./pages/categories/Update";

const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />}/>

                    <Route path="categories">
                        <Route index element={<CategoriesPage />} />
                        <Route path="create" element={<CategoriesCreateForm />} />
                        <Route path="update/:id" element={<CategoriesUpdateForm />} />
                    </Route>

                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;