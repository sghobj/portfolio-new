import { useCallback, useState } from "react";
import "./Sidebar.scss";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ContactMe } from "../contact/ContactMe.tsx";
import { links } from "../constants/general.tsx";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLinkClick = useCallback(() => {
    setIsCollapsed(true);
  }, [setIsCollapsed]);

  return (
    <div
      className={`sidebar d-none d-md-flex ${isCollapsed ? "collapsed" : ""}`}
    >
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <ul className="nav flex-column">
        {links.map((link) => {
          return (
            <>
              <li className="nav-item" key={link.label}>
                <Link
                  to={link.href}
                  className="nav-link"
                  onClick={handleLinkClick}
                >
                  {link.icon}
                  {!isCollapsed && <span>{link.label}</span>}
                </Link>
              </li>
            </>
          );
        })}
      </ul>

      <div className="sidebar-footer">
        <ContactMe size={"md"} />
      </div>
    </div>
  );
};
