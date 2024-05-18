import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/authSlice";
import authService from "../../Appwrite/auth";


function LogoutBtn() {
  const status=useSelector(state=>state.authstore.status);
  // console.log("logout buttons status",status);
  const dispatcher = useDispatch();
  const handleLogout = () => {
    authService.logout().then(() => dispatcher(logout()));
    // console.log(status);
  };
  return (
    <div>
      <button
        className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default LogoutBtn;
