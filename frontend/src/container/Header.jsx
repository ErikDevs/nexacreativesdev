import { useContext, useEffect, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import { links } from "../constants";
import { Link } from "react-router-dom";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { ThemeContext } from "../components/ThemeContextProvider";
import NexaLogo from "/nexalogo.png";
import LightLogo from "/logo light.png";
import "../index.css";

const imageSize = 120;

const Header = () => {
  const [isActive, setisActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { theme, isSet, setIsSet } = useContext(ThemeContext);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  return (
    <>
      <header
        className={` ${
          theme === "dark"
            ? "bg-secondary text-white"
            : "bg-white text-secondary"
        }       
        ${
          isScrolled ? "opacity-75 fixed" : ""
        } top-0 mx-auto drop-shadow static transition-all ease-in-out duration-500 z-40 w-full`}
      >
        {isSet && (
          <>
            <div
              className={`${
                isScrolled ? "hidden" : "md:flex"
              } hidden   bg-purple-600 relative  transition-all h-10 duration-300 ease-linear  items-center justify-center px-6 w-full  text-primary`}
            >
              <p className="text-xs text-center flex items-center gap-4 flex-wrap">
                Impressed by our work? Hire us for professional web development
                services
                <span className=" bg-slate-50 rounded py-1 text-accent px-2 flex items-center gap-2 ">
                  <FaWhatsapp size={20} />
                  <a
                    href="https://wa.me/254797710074" // Replace with your WhatsApp number
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp us
                  </a>
                </span>
              </p>

              <MdClose
                size={20}
                className="absolute right-2 cursor-pointer hover:scale-110"
                onClick={() => setIsSet(false)}
              />
            </div>
          </>
        )}
        {/* navigation for desktops */}
        <nav className="hidden text-sm md:flex mx-auto max-w-7xl px-6 md:px-10 items-center h-12 justify-between">
          <Link to="/">
            <div className="flex">
              <img
                width={imageSize}
                src={theme === "dark" ? LightLogo : NexaLogo}
                alt="site-logo"
              />
            </div>
          </Link>

          <div className="flex justify-between gap-x-4 items-center">
            {links.map((link, index) => (
              <li
                className={`no-underline list-none cursor-pointer onHover transition-all duration-300`}
                key={link.name}
                onClick={() => {
                  setisActive(index);
                }}
              >
                {index === 0 ? (
                  <Link to={link.href}>{link.name}</Link>
                ) : (
                  <a
                    href={link.href}
                    className={`${index === links.length - 1 ? "" : ""}`}
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </div>
        </nav>

        {/* mobile navbar */}
        <nav
          className={`md:hidden w-full h-12 px-4 flex justify-between items-center`}
        >
          <div className="flex justify-between w-full">
            <Link to="/" className="cursor-pointer">
              <img
                width={imageSize}
                src={theme === "dark" ? LightLogo : NexaLogo}
                alt="site-logo"
              />
            </Link>

            <div className="flex gap-4 items-center">
              {!isOpen && (
                <HiBars3
                  className="cursor-pointer"
                  size={32}
                  onClick={toggleMenu}
                />
              )}
            </div>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className={`${
                  theme === "dark" ? "bg-secondary" : "bg-primary"
                } flex drop-shadow-md h-screen right-0 fixed top-0 flex-col gap-4 sm:w-1/2 w-3/4 z-40 py-6 items-end px-6`}
              >
                <div className="flex justify-between w-full">
                  <img
                    src={theme === "dark" ? LightLogo : NexaLogo}
                    width={imageSize}
                    alt="logo"
                  />
                  <MdClose
                    size={32}
                    className="cursor-pointer"
                    onClick={toggleMenu}
                  />
                </div>

                {links.map((link, index) => (
                  <li
                    id={link.href}
                    className={`no-underline flex items-center justify-between list-none cursor-pointer hover:scale-105 py-5 px-5 rounded-2xl w-full transition-all duration-300 ${
                      isActive === index && theme === "dark"
                        ? "bg-gradient-to-tr from-purple-600 to-blue-600 text-primary"
                        : isActive === index && theme !== "dark"
                        ? "bg-gradient-to-tr from-purple-600 text-primary to-blue-600"
                        : ""
                    }`}
                    key={link.name}
                    onClick={() => {
                      setisActive(index);
                      toggleMenu();
                    }}
                  >
                    <a href={link.href}>{link.name}</a>
                    {isActive == index && <FaArrowRight />}
                  </li>
                ))}
              </motion.div>
            )}

            {isOpen && (
              <div
                className="fixed z-0 w-screen h-screen inset-0 bg-slate-900 overscroll-y-none  opacity-75"
                onClick={() => setIsOpen(false)}
              ></div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
