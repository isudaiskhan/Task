import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { IoMdMenu } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State for login status
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    // Check if user is authenticated (i.e., authToken exists)
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Log out!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "No, stay logged in"
    }).then((result) => {
      if (result.isConfirmed) {
        // Log out user
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate('/login');
  
     Swal.fire({
      title: 'You have been Logged out!',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
        });
      }
    });
  };
  
  

  const navItems = [
    { id: 'home', label: 'Home', link: '/' },
    { id: 'about', label: 'About', link: '/about' },
    { id: 'profile', label: 'Profile', link: '/profile' },
    { id: 'contact', label: 'Contact', link: '/contact' },

    isAuthenticated
      ? { id: 'logout', label: 'Logout', link: '/', action: handleLogout } 
      : { id: 'login', label: 'Login', link: '/login' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  return (
    <>
      <nav className={`sticky top-0 w-full bg-black z-50 transition duration-300 ${hasScrolled ? 'shadow-xl' : ''}`}>
        <div className="max-w-[1240px] mx-auto p-7">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold text-red-700">Task</span>
            <div className="hidden lg:flex items-center space-x-5">
              <ul className="flex items-center space-x-10">
                {navItems.map((item) => (
                  <li key={item.id}>
                    {item.id === 'logout' ? (
                      <button
                        onClick={item.action}
                        className="text-lg text-white hover:text-red-700"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <NavLink
                        to={item.link}
                        className="text-lg text-white hover:text-red-700"
                        activeclassname="text-green-500"
                      >
                        {item.label}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <button className="lg:hidden text-white" onClick={toggleMobileMenu}>
              {mobileMenu ? <AiOutlineClose size={28} /> : <IoMdMenu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenu && (
        <div className="fixed inset-0 z-50 min-h-screen bg-black bg-opacity-70">
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="absolute right-0 min-h-screen w-3/4 sm:w-1/3 py-6 px-8 bg-white"
          >
            <button className="absolute top-4 right-4" onClick={closeMobileMenu}>
              <AiOutlineClose size={28} className="text-green-600" />
            </button>
            <ul className="mt-8 space-y-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  {item.id === 'logout' ? (
                    <button
                      onClick={() => {
                        item.action();
                        closeMobileMenu();
                      }}
                      className="text-black text-lg font-semibold hover:text-green-600"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <NavLink
                      to={item.link}
                      className="text-black text-lg font-semibold hover:text-green-600"
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Navbar;