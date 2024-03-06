import React, { useEffect, useState } from "react";
import { Link, matchPath, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Catalog from "../core/Header/Catalog";
import { useSelector } from "react-redux";
import { IoMdCart } from "react-icons/io";
import ProfileDropDown from "../core/auth/ProfileDropDown";
import { CartNotVisible } from "../../utils/constants";
import axios from "axios";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/api";


const Header = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
const navigate=useNavigate()
  const [activePage, setActivePage] = useState(NavbarLinks[0]);
  const [subLinks, setSubLinks] = useState([]);

  const matchRoute = (route) => {
    if (route) return matchPath({ path: route }, location.pathname);
    else return null;
  };
  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Result:", result);
      
      setSubLinks(result?.data?.allCategory);
      console.log("subLinks",subLinks)
    } catch (error) {
      console.log(error);
      console.log("Could Not fetch Category list");
    }
  };

  useEffect(() => {
    fetchSubLinks();
    token?`${navigate("/dashboard/my-profile")}`:("null")
  }, []);

  return (
    <motion.div
      initial={{ y: -20 }}
      whileInView={{ y: 0, transition: { delay: 0.2 } }}
      className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700"
    >
      <motion.div
        initial={{ y: -10 }}
        whileInView={{ y: 0, transitions: { duration: 0.1 } }}
        className="flex text-white flex-row justify-between items-center w-11/12 max-w-maxContent"
      >
        <div>
          <Link to={"/"}>
            <img src={Logo} alt="logo" width={160} height={42} loading="lazy" />
          </Link>
        </div>

        {/* Nav Links */}
        <nav>
          <ul className="flex flex-row gap-x-6 text-richblack-25">
            {NavbarLinks.map((item, index) =>
              item?.title === "Catalog" ? (
                <select className="bg-richblack-900 outline-none" defaultValue="">
                 Category

                  {subLinks.map((category,index)=>(
                    <option key={category._id}>{category.name}</option>
                  ))}
                </select>
              ) : (
                <Link to={item?.path}>
                  <motion.li
                    key={index}
                    // className={`${
                    //   matchRoute(item?.path)
                    //     ? "text-yellow-25"
                    //     : "text-richblack-25"
                    // }`}
                    className={`${
                      activePage.title === item.title
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                    onClick={() => setActivePage(item)}
                  >
                    {item.title}
                  </motion.li>
                </Link>
              )
            )}
          </ul>
        </nav>

        {/* login signup dashboard */}

        <div className="flex flex-row items-center gap-x-4">
          {
            //When user not null
            user && user?.accountType !== CartNotVisible && (
              <Link to={"/dashboard/cart"} className="relative">
                <IoMdCart className="absolute" />
                {totalItems > 0 && <span>{totalItems}</span>}
              </Link>
            )
          }

          {
            //token jwt kb create hoga jb logn ya signup hoga
            token === null && (
              <Link to="/login">
                <button className="border border-richblack-700 bg-richblack-800 px-[12px] rounded-lg py-2">
                  Login
                </button>
              </Link>
            )
          }
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] rounded-lg py-2">
                SignUp
              </button>
            </Link>
          )}

          {
            //when loggedIn
            token && <ProfileDropDown />
             
          }
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Header;
