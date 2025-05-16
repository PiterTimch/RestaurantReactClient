import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import CategoriesPage from "./pages/categories";
import CategoriesCreateForm from "./pages/categories/create";

const App = () => {


    return (
        <>
            <div className={"row gap-3 justify-content-center"}>
                <div className={"col col-5"}>
                    <CategoriesPage/>
                </div>
                <div className={"col col-5"}>
                    <CategoriesCreateForm/>
                </div>
            </div>
        </>
    );
}

export default App;
