import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import client from "./gql/client";
import "./index.css";
import theme from "./styles/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
