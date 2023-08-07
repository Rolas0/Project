import React from 'react';

import './Main.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navigation/Navbar';

import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

function Main() {
    return (
        <>
            <main className="main">
                <div className="menu-container">
                    <Sidebar />
                </div>

                <div className="home-container">
                    <div className="container">
                        <Navbar />
                    </div>
                    <div className="content-container">
                        <Outlet />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Main;
