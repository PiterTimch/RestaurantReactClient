import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import CategoriesPage from "./pages/categories";
import CategoriesCreateForm from "./pages/categories/create";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNavBar from "./components/navigation/mainNavBar";

const App = () => {


    return (
        <Router>
            <MainNavBar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<CategoriesPage />} />
                    <Route path="/categoryCreate" element={<CategoriesCreateForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
