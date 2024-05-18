import { Container, LogoutBtn, Logo } from "../../components";
import React from "react";
import { useSelector } from "react-redux";
import { logout } from "../../Store/authSlice";
import { Link, useNavigate } from "react-router-dom";


function Header() {
  const status = useSelector((state) => state.authstore.status);
  // console.log("error hai")
  // console.log(status);
  const navigator = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !status,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !status,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: status,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: status,
  },
  ];

  return (
    <header className="py-3 bg-gray-500 shadow">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigator(item.slug)}
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
             {status && (
          <li>
            <LogoutBtn/>
          </li>)}
          </ul>
         
        </nav>
      </Container>
    </header>
  );
}

export default Header;
