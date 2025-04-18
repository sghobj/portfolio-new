import "./Layout.scss";
import { ReactNode } from "react";
import { useSpinner } from "../../context/GeneralContext.tsx";
import { Spinner } from "../spinner/Spinner.tsx";
import { Navbar } from "../navbar/Navbar.tsx";
import { Sidebar } from "../sidebar/Sidebar.tsx";
import { useScreenSize } from "../../hooks/useScreenSize.ts";

type LayoutProps = {
  children: ReactNode;
};
export const Layout = ({ children }: LayoutProps) => {
  const { isLoading } = useSpinner();
  const screenSize = useScreenSize();

  const isSmallScreen = screenSize.width < 840;

  return (
    <div className="layout-main-container">
      {!isSmallScreen ? <Sidebar /> : null}
      <div className="main-content">
        {isSmallScreen ? <Navbar /> : null}
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={"content-container"}>{children}</div>
        )}
      </div>
    </div>
  );
};
