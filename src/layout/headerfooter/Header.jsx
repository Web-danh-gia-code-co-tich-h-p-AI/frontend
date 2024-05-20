import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "../../api/axiosConfig";

const Header = ({ name, setName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const logout = async () => {
    try {
      await axios.post(
        "/api/logout",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setName("");
      Cookies.remove("token");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const response = await axios.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(response.data.name);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [setName]);

  let menu;

  if (!name) {
    menu = (
      <ul className="mb-2 navbar-nav me-auto mb-md-0">
        <li className="nav-item active">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );
  } else {
    menu = (
      <ul className="mb-2 navbar-nav me-auto mb-md-0">
        <li className="nav-item active">
          <Link to="/profile" className="nav-link">
            {name}
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/login" className="nav-link" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    );
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [isMenuOpen]);

  return (
    <div className="w-full">
      <header className="w-full bg-main-black">
        <div className="flex items-center justify-between w-full px-4 py-4">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-6 h-6 mr-2 text-white"
            >
              <path d="M6 6v4h4V6H6Z" />
              <path
                fillRule="evenodd"
                d="M5.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2H1.75a.75.75 0 0 0 0 1.5H3v.75H1.75a.75.75 0 0 0 0 1.5H3v.75H1.75a.75.75 0 0 0 0 1.5H3a2 2 0 0 0 2 2v1.25a.75.75 0 0 0 1.5 0V13h.75v1.25a.75.75 0 0 0 1.5 0V13h.75v1.25a.75.75 0 0 0 1.5 0V13a2 2 0 0 0 2-2h1.25a.75.75 0 0 0 0-1.5H13v-.75h1.25a.75.75 0 0 0 0-1.5H13V6.5h1.25a.75.75 0 0 0 0-1.5H13a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-.75V1.75a.75.75 0 0 0-1.5 0V3H6.5V1.75A.75.75 0 0 0 5.75 1ZM11 4.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5h6Z"
                clipRule="evenodd"
              />
            </svg>
            <h1 className="text-lg font-semibold leading-6 text-white">
              Chấm Code tự động
            </h1>
          </div>
          <nav className="flex items-center" ref={menuRef}>
            <div className="laptop:hidden">
              <button
                onClick={toggleMenu}
                className="text-white rounded-sm bg-zinc-500 boder focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  {isMenuOpen ? (
                    <path
                      fillRule="evenodd"
                      d="M3 5h18v2H3V5ZM3 11h18v2H3v-2ZM3 17h18v2H3v-2Z"
                      clipRule="evenodd"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M4 6h16v2H4V6Zm0 6h16v2H4v-2Zm0 6h16v2H4v-2Z"
                      clipRule="evenodd"
                    />
                  )}
                </svg>
              </button>
            </div>
            <div
              className={`laptop:flex justify-between items-center ${
                isMenuOpen
                  ? "fixed left-0 top-0 bg-main-black h-full w-64 flex-col p-4"
                  : "hidden"
              }`}
            >
              <NavLink
                to="/home"
                className="flex items-center p-2 mr-4 text-white rounded-lg hover:bg-zinc-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path d="M8.543 2.232a.75.75 0 0 0-1.085 0l-5.25 5.5A.75.75 0 0 0 2.75 9H4v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h1.25a.75.75 0 0 0 .543-1.268l-5.25-5.5Z" />
                </svg>
                Trang chủ
              </NavLink>
              <NavLink
                to="/code"
                className="flex items-center p-2 mr-4 text-white rounded-lg hover:bg-zinc-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.07 4.4a1 1 0 0 0-1.4-.33L3.4 6.4a3 3 0 0 0 0 5.18l3.26 2.32a1 1 0 1 0 1.1-1.66L4.5 9.9a1 1 0 0 1 0-1.73l2.76-1.96a1 1 0 0 0 .33-1.4Zm8-1a1 1 0 0 0-1.1 1.66l2.75 1.96a1 1 0 0 1 0 1.73l-2.75 1.96a1 1 0 1 0 1.1 1.66l3.26-2.32a3 3 0 0 0 0-5.18l-3.26-2.32ZM9.9 18.77a1 1 0 0 1 1.23.73l.8 3.2a1 1 0 1 1-1.95.49l-.8-3.2a1 1 0 0 1 .72-1.23Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M14.02 2.3a1 1 0 0 1 .69 1.23l-4.5 17a1 1 0 0 1-1.93-.51l4.5-17a1 1 0 0 1 1.23-.72Z"
                    clipRule="evenodd"
                  />
                </svg>
                Chấm code
              </NavLink>
              <NavLink
                to="/contest"
                className="flex items-center p-2 mr-4 text-white rounded-lg hover:bg-zinc-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.25 2a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 .75.75v2.027a3.001 3.001 0 0 1 2.25 2.923v5a3 3 0 0 1-2.38 2.936 5.002 5.002 0 0 1-9.24 0 3.001 3.001 0 0 1-2.38-2.936v-5a3 3 0 0 1 2.25-2.923V2a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 .75.75v2h-5V2h-2v2h-5V2h2v2h5V2ZM4 6a1 1 0 0 0 1 1h1v7a3 3 0 0 0 2.82 2.995l.18.005V21H5v-2.5a2.5 2.5 0 1 0-2 0V21H2v-6.5a2.5 2.5 0 1 0 2-2.45V7h-1a1 1 0 0 0-1 1ZM21 16v-4.5a1 1 0 0 1 1 1V17h-1v-.5Zm-1.5 4v-2a1.5 1.5 0 1 0-3 0v2h3Zm-8.5 1a3.5 3.5 0 1 0 7 0v-7h-7v7Zm-8-1.5v-2a1.5 1.5 0 1 0-3 0v2h3Z"
                    clipRule="evenodd"
                  />
                </svg>
                Contest
              </NavLink>
              <NavLink
                to="/home"
                className="flex items-center p-2 mr-4 text-white rounded-lg hover:bg-zinc-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path d="M8.5 1h-1v14h1V1Z" />
                </svg>
                <div>Rank</div>
              </NavLink>
              {menu}
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
