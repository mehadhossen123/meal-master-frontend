import React from 'react';
import useRole from '../hook/useRole';

const MyExpense = () => {
    const {userRole}=useRole()
    console.log("user role ",userRole)
    return (
        <div className=''>
            this is my expense 
            
        </div>
    );
};

export default MyExpense;