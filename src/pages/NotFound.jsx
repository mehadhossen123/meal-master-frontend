import React from 'react';
import img from '../assets/not.gif'
import { Link } from 'react-router';
import { FcHome } from "react-icons/fc";

const NotFound = () => {
    return (
      <div className="flex items-center justify-center flex-col min-h-screen">
        <img src={img} className="w-[500px]" alt="" />
        <div>
          <Link to={"/"} className="btn btn-primary  flex items-center">
            <FcHome className='text-2xl' /> Go home page{" "}
          </Link>
        </div>
      </div>
    );
};

export default NotFound;