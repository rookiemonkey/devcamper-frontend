import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";

const MyApp = ({ Component, pageProps }) => {

  useEffect(() => {
    import("jquery")
      .then($ => {
        window.$ = window.jQuery = $;
        return import("bootstrap");
      });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;