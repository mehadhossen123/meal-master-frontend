import React from 'react';
import Navbar from '../component/Navbar';
import { Outlet } from 'react-router';
import Footer from '../component/Footer';

const AuthLayout = () => {
    return (
      <div>
        <nav className="">
          <Navbar></Navbar>
        </nav>
        <main className="w-11/12 mx-auto min-h-screen">
          <Outlet></Outlet>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    );
};

export default AuthLayout;