import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./Appwrite/auth";
import { login, logout } from "./Store/authSlice";
import { Header,Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatcher = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userdata) =>{
        
        return userdata ? dispatcher(login({ userdata })) : dispatcher(logout());
      })
      .finally(() => setLoading(false));
  }, []);

  return loading?(<div>Loading State ....</div>):
  (
  <div className="min-h-screen flex flex-wrap content-between bg-gray-100">
    <div className="w-full block">
      <Header/>
      <main>

      <Outlet/>

      </main>
      <Footer/>
    </div>
  </div>
  )
}

export default App;
