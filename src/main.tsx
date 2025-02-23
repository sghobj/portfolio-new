import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App.tsx'
import { ApolloProvider } from "@apollo/client";


// Import our custom CSS
import '../src/scss/styles.scss'
import {BrowserRouter} from "react-router-dom";
import { client } from './utils/apollo.ts';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ApolloProvider client={client}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
      </ApolloProvider>
  </StrictMode>,
)
