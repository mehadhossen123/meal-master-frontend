import React from 'react';
import { Outlet } from 'react-router';

import Footer from '../component/Footer';
import Navbar from '../nav/Navbar';


const HomeLayout = () => {
    return (
      <div className=''>
        <nav className=''>
            <Navbar></Navbar>
            
        </nav>
        <main className='w-11/12 mx-auto min-h-screen'>
          <Outlet></Outlet>
        </main>
        <footer>
            <Footer></Footer>

        </footer>
      </div>
    );
};

export default HomeLayout;