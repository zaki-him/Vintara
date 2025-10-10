import { LogOut, Notebook, ShoppingCart, User } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router";

const Header: React.FC = () => {
  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Collections",
      link: "#collections",
    },
    {
      name: "Products",
      link: "/products",
    },
  ];

  const navigate = useNavigate()

  //check login status
  const user = localStorage.getItem("user");
  const isLoggedIn = !!user; //convert the value into a boolean

  const handleLogOut = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    navigate('/')
  }

  return (
    <>
      <header className="flex justify-between items-center px-8 md:px-14 lg:px-20 py-6 bg-creme">
        <Link to={"/"}>
          <h1 className="font-playfair text-3xl font-bold">Vintara</h1>
        </Link>

        <nav className="flex items-center gap-4 max-sm:hidden">
          {links.map((link, index) => (
            <a href={link.link} key={index}>
              <p
                key={index}
                className="font-playfair py-1 text-xl transition-all duration-500 animate-nav hover:text-coco"
              >
                {link.name}
              </p>
            </a>
          ))}
        </nav>

        {!isLoggedIn ? (
          <Link to={"/sign-in"}>
            <button className="cursor-pointer px-8 py-1.5 font-playfair bg-coco text-creme">
              Login
            </button>
          </Link>
        ) : (
          <div className="flex gap-6 items-center">
            <Link to={"/orders"}>
              <Notebook className="size-6"/>
            </Link>

            <Link to={"/cart"}>
              <ShoppingCart className="size-6" />
            </Link>

            <Link to={"/profile"}>
              <User className="size-6" />
            </Link>

            <button 
              className="cursor-pointer"
              onClick={handleLogOut}  
            >
              <LogOut className="size-6 text-red-500 hover:text-red-900"/>
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
