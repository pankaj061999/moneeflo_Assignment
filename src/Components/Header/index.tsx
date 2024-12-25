"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/reducers";
import { setToken } from "@/redux/actions";

const HeaderComponent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null); // Ref for profile menu
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const handleLogout = () => {
    dispatch(
      setToken({
        accessToken: "",
        refreshToken: "",
        isLoggedIn: false,
      })
    );
    router.push("/login");
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <h1
          className="text-lg font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Admin Dashboard
        </h1>

        <nav className="hidden md:flex md:space-x-4 items-center">
          <Link
            href="/"
            className="block md:inline-block px-4 py-2 text-center hover:text-gray-400"
          >
            Home
          </Link>
          {isLoggedIn && (
            <div className="relative flex items-center" ref={profileMenuRef}>
              <img
                src="https://randomuser.me/api/portraits/men/31.jpg"
                alt="User Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <button
                className="block px-4 py-2 text-center hover:text-gray-400"
                onClick={toggleProfileMenu}
              >
                Profile
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 bg-gray-700 text-white rounded shadow-lg w-48">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-600"
                    onClick={toggleProfileMenu}
                  >
                    Settings
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        <button
          className="text-2xl md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>
      </div>

      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 w-3/4 h-full bg-gray-800 text-white transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-2xl"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <Link
            href="/"
            className="block px-4 py-2 text-center text-white hover:text-gray-400"
            onClick={toggleMenu}
          >
            Home
          </Link>
          {isLoggedIn && (
            <>
              <div className="flex items-center space-x-2 my-4">
                <img
                  src="https://randomuser.me/api/portraits/men/31.jpg"
                  alt="User Profile"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <Link
                href="/profile"
                className="block px-4 py-2 text-center text-white hover:text-gray-400"
                onClick={toggleMenu}
              >
                Settings
              </Link>
              <button
                className="block px-4 py-2 text-center text-white hover:text-gray-400"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
