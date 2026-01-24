import React from 'react';
 import { UtensilsCrossed } from "lucide-react";
      

const Logo = () => {
    return (
      <div>
        <div className="flex items-center gap-2">
          <div className="bg-secondary p-2 rounded-lg">
            <UtensilsCrossed className="text-white lg:w-6 lg:h-6 w-4 h-3" />
          </div>
          <span className=" hidden lg:block text-2xl font-bold tracking-tight text-gray-800">
            <span className='text-4xl'>M</span> eal
            <span className="text-primary">
              <strong> M</strong>aster
            </span>
          </span>
        </div>
      </div>
    );
};

export default Logo;