import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const Root = () => {
    return (
        <div>
            <ScrollToTop/>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Root;