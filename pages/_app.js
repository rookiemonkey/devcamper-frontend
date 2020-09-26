import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { useEffect } from "react";
import { AuthProvider } from '../context/auth';

const MyApp = ({ Component, pageProps }) => {

  useEffect(() => {
    import("jquery")
      .then($ => {
        window.$ = window.jQuery = $;
        return import("bootstrap");
      });
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp;