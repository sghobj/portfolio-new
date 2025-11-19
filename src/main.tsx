import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { App } from "./App.tsx";
import { ApolloProvider } from "@apollo/client";

// Import our custom CSS
import "../src/scss/styles.scss";
import { BrowserRouter } from "react-router-dom";
import { client } from "./utils/apollo.ts";
import { GeneralProvider } from "./context/GeneralContext.tsx";
import { Provider } from "./components/ui/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Provider>
          <GeneralProvider>
            <App />
          </GeneralProvider>
        </Provider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
);
