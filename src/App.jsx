import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from './pages/Create-Page';
import DashboardPage from './pages/Dashboard-Page';

const App = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<DashboardPage/>} />
                    <Route exact path="/Create" element = {<CreatePage/>} />
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
};

export default App;