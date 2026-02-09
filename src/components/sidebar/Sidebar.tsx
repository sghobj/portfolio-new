import { useCallback, useState } from "react";
import "./Sidebar.scss";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { ContactMe } from "../contact/ContactMe.tsx";
import { links } from "../../constants/general.tsx";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

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
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>

      <ul className="nav flex-column">
        {links.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <li className="nav-item" key={link.label}>
              <Link
                to={link.href}
                className={`nav-link ${isActive ? "active" : ""}`}
                onClick={handleLinkClick}
                data-testid={link.testId}
              >
                {link.icon}
                {!isCollapsed && <span>{link.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer">
        <ContactMe size={"md"} vertical={isCollapsed} />
      </div>
    </div>
  );
};
