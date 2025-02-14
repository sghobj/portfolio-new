import './App.scss'
import './scss/_variables.scss'
import { Router } from './router/Router'

export const App = () => {

  return (
      <div className={'main-container'}>
          <Router />
      </div>
  )
}