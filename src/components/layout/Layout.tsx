import "./Layout.scss";
import { ReactNode } from "react";
import { Spinner } from "../spinner/Spinner.tsx";
import { Sidebar } from "../sidebar/Sidebar.tsx";
import { useScreenSize } from "../../hooks/useScreenSize.ts";
import { BurgerMenu } from "../navbar/BurgerMenu.tsx";
import { useSpinner } from "../../hooks/useSpinner.ts";

type LayoutProps = {
  children: ReactNode;
};
export const Layout = ({ children }: LayoutProps) => {
  const { isLoading } = useSpinner();
  const screenSize = useScreenSize();

  const isSmallScreen = screenSize.width < 768;

  return (
    <div className="layout-main-container">
      {!isSmallScreen && <Sidebar />}
      <div className={`main-content ${!isSmallScreen ? "with-sidebar" : ""}`}>
        {isSmallScreen && <BurgerMenu />}
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="content-container">{children}</div>
        )}
      </div>
    </div>
  );
};
