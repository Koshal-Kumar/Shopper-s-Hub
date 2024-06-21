import React, { useState } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { RiStore3Line } from "react-icons/ri";

import { useAuth } from "../../context/auth";
import SearchInput from "./Form/SearchInput";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import Spinner from "../Spinner";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [loader, setLoader] = useState(false);
  const { page, limit } = useParams();

  console.log("from Header", page, limit);

  const handleLogOut = () => {
    setLoader(true);
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.clear();
  };

  return (
    <>
      {loader && (
        <Spinner loader={loader} style={{ width: "100%", height: "100%" }} />
      )}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid p-0">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse navbar-list"
            id="navbarTogglerDemo01"
          >
            <div className="header-left col">
              <Link
                to="/"
                className="navbar-brand text-center"
                onClick={() => setLoader(true)}
              >
                <RiStore3Line size="1.8rem" /> <p>Shopper's Bay</p>
              </Link>
            </div>
            <div className="header-middle header-search-container col  align-items-center justify-center">
              <SearchInput />
            </div>
            <div className="header-right col">
              <ul
                className="navbar-nav ms-auto mb-2 mb-lg-0"
                style={{ justifyContent: "flex-end" }}
              >
                <li className="nav-item px-2 ">
                  <NavLink
                    to="/"
                    className="nav-link "
                    onClick={() => setLoader(true)}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item px-2 ">
                  <NavLink
                    to="/about"
                    className="nav-link "
                    onClick={() => setLoader(true)}
                  >
                    About
                  </NavLink>
                </li>

                {!auth.user ? (
                  <>
                    {" "}
                    <li className="nav-item px-2 ">
                      <NavLink
                        to="/signup"
                        className="nav-link"
                        onClick={() => setLoader(true)}
                      >
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item px-2 ">
                      <NavLink
                        to="/login"
                        className="nav-link"
                        onClick={() => setLoader(true)}
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li className="nav-item dropdown">
                    <div className="dynamic-nav-content">
                      <NavLink
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {auth.user.role}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === "admin" ? "admin" : "user"
                            }`}
                            className="dropdown-item"
                            onClick={() => setLoader(true)}
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            onClick={() => {
                              setLoader(true);
                              handleLogOut();
                            }}
                            to="/login"
                            className="dropdown-item"
                          >
                            Logout
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </li>
                )}
                {auth?.user?.role === "user" ? (
                  <li className="nav-item px-2 ">
                    <NavLink
                      to="/cart"
                      className="nav-link "
                      onClick={() => setLoader(true)}
                      style={{
                        padding: "3px 8px",
                        margin: "0",
                        display: "inline-block",
                      }}
                    >
                      <Badge count={cart?.length}>
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                          width="28px"
                          height="28px"
                        >
                          <path
                            d="M5 7c-.55 0-1 .45-1 1s.45 1 1 1h2.219l2.625 10.5c.222.89 1.02 1.5 1.937 1.5H23.25c.902 0 1.668-.598 1.906-1.469L27.75 10H11l.5 2h13.656l-1.906 7H11.781L9.156 8.5A1.983 1.983 0 0 0 7.22 7Zm17 14c-1.645 0-3 1.355-3 3s1.355 3 3 3 3-1.355 3-3-1.355-3-3-3Zm-9 0c-1.645 0-3 1.355-3 3s1.355 3 3 3 3-1.355 3-3-1.355-3-3-3Zm0 2c.563 0 1 .438 1 1 0 .563-.438 1-1 1-.563 0-1-.438-1-1 0-.563.438-1 1-1Zm9 0c.563 0 1 .438 1 1 0 .563-.438 1-1 1-.563 0-1-.438-1-1 0-.563.438-1 1-1Z"
                            fill="#323232"
                            class="fill-000000"
                          ></path>
                        </svg>
                      </Badge>
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
