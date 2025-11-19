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

  const isSmallScreen = screenSize.width < 840;

  return (
    <div className="layout-main-container">
      {!isSmallScreen ? <Sidebar /> : null}
      <div className="main-content">
        {isSmallScreen ? <BurgerMenu /> : null}
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={"content-container"}>{children}</div>
        )}
      </div>
    </div>
  );
};
