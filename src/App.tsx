import './App.scss'
import './scss/_variables.scss'
import { Router } from './router/Router'
import {Layout} from "./components/layout/Layout.tsx";

export const App = () => {

    return (
        <Layout>
          <Router />
        </Layout>
  )
}