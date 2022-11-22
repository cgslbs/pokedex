import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { theme } from "../styles/theme";
import { Provider } from "jotai";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </MantineProvider>
  );
}

export default MyApp;
