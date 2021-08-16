import store from "app/store";
import type { AppProps } from "next/app";
import Head from "next/head";
// import 'tailwindcss/tailwind.css'
import { Provider } from "react-redux";
import "styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />;
    </Provider>
  );
}
export default MyApp;
