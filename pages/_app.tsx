import "../styles/globals.css";
import type {AppProps} from "next/app";

import {Provider} from "react-redux";
import {ThemeProvider} from "styled-components";

import {store} from "@redux/store";
import {theme} from "@theme";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
