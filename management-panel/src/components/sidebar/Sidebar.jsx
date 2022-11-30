import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import { getUser } from "../../Services/axios";

const sidebarNavItems = [
  {
    display: "Home",
    icon: <i className="bx bx-home"></i>,
    to: "/",
    section: "",
  },
  {
    display: "User",
    icon: <i className="bx bx-user"></i>,
    to: "/user",
    section: "user",
  },
  {
    display: "Orders",
    icon: <i className="bx bx-receipt"></i>,
    to: "/order",
    section: "order",
  },
  {
    display: "Menu Managment",
    icon: <i class="bx bxs-food-menu"></i>,
    to: "/menu-managment",
    section: "menu-managment",
  },
  {
    display: "Accounting",
    icon: <i class="bx bxs-bank"></i>,
    to: "/accounting",
    section: "accounting",
  },
];
const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  const [navbarOpen, setNavbarOpen] = useState(true);

  const [user, setUser] = useState({ name: "Amir Deldar" });
  const [username, setUsername] = useState("amirdldr@gmail.com");
  useEffect(() => {
    getUser(username)
      .then((e) => {
        //console.log(e.data.username)
        setUser({
          name: e.data.username,
        });
      })
      .catch();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <>
      <span className={`btn-open ${navbarOpen ? " hide-btn" : ""}`} onClick={handleToggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
        //   viewBox="0 0 29 29"
        //   style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
        >
          <path d="M12 22c5.514 0 10-4.486 10-10S17.514 2 12 2 2 6.486 2 12s4.486 10 10 10zM10 7l6 5-6 5V7z"></path>
        </svg>
      </span>
      <nav className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
        <div className="sidebar__logo">
          <div className="sideLogo">
            <img
              className="logo"
              src="https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-20810-1baium2_5f280f6f.jpeg?region=0,0,600,600"
              alt=""
            ></img>
          </div>
          <div className="profName">
            <div className="text_name">
              <p>{user.name}</p>
              <p>manager</p>
            </div>
          </div>
          <button className="btn-close" onClick={handleToggle}>
            {/* {navbarOpen ? (
                        <MdClose style={{ color: "#fff", width: "40px", height: "40px" }} />
                    ) : (
                        <FiMenu style={{ color: "#fff", width: "40px", height: "40px" }} />
                    )} */}
            <img
              src="https://a.trellocdn.com/prgb/dist/images/workspace-navigation/chevron-left.58243262833f693f6101.svg"
              alt=""
            ></img>
          </button>
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
          <div
            ref={indicatorRef}
            className="sidebar__menu__indicator"
            style={{
              transform: `translateX(-50%) translateY(${
                activeIndex * stepHeight
              }px)`,
            }}
          ></div>
          {sidebarNavItems.map((item, index) => (
            <Link to={item.to} key={index}>
              <div
                className={`sidebar__menu__item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <div className="sidebar__menu__item__icon">{item.icon}</div>
                <div className="sidebar__menu__item__text">{item.display}</div>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
