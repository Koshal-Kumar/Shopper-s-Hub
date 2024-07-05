import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Spinner from '../Spinner';
const UserMenu = () => {
  const navigate = useNavigate();
  const [loader,setLoader] = useState(false);

  const handleNavigateUser = (e)=>{
      e.preventDefault();
      setLoader(true);
      setTimeout(() => {
        navigate(`/dashboard/user/orders`);
        setLoader(false);
      }, 1000); 
    };
    
  return (
    <>
        {loader && <Spinner loader={loader} style={{ width: "100%", height: "100%" }} />}

      <div className="text-center">

        <div className="list-group">
            <h3>User Panel</h3>
          <NavLink 
           className="list-group-item list-group-item-action "
           to="/dashboard/user/profile"
           >
            Profile
          </NavLink>
          <NavLink
          className="list-group-item list-group-item-action"
          onClick={(e)=>handleNavigateUser(e)}
          to="/dashboard/user/orders" 
          >
            Orders
          </NavLink>
      
        </div>
      </div>
    </>
  )
}

export default UserMenu
