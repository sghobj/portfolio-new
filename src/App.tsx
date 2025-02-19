import './App.scss'
import './scss/_variables.scss'
import { Router } from './router/Router'
import {Navbar} from "./components/navbar/Navbar.tsx";
import {useScreenSize} from "./hooks/useScreenSize.ts";

export const App = () => {

    const screenSize = useScreenSize();

    const isSmallScreen = screenSize.width < 840

    return (
      <div className={'main-container'}>
          {!isSmallScreen ? <div className={'landing-buttons-div'}>
              <Navbar />
          </div> : null }
          <Router />
      </div>
  )
}