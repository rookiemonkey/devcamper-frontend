import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { useEffect } from "react";
import { AuthProvider } from '../context/auth';
import { ToasterProvider } from '../context/toaster';

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
      <ToasterProvider>
        <Component {...pageProps} />
      </ToasterProvider>
    </AuthProvider>
  )
}

export default MyApp;