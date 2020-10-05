import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import App from 'next/app'
import { AuthProvider } from '../context/auth';
import { ToasterProvider } from '../context/toaster';

class MyApp extends App {

  componentDidMount() {
    import("jquery")
      .then($ => {
        window.$ = window.jQuery = $;
        return import("bootstrap");
      });
  }

  render() {

    const { Component, pageProps } = this.props;

    return (
      <AuthProvider>
        <ToasterProvider>
          <Component {...pageProps} />
        </ToasterProvider>
      </AuthProvider>

    )
  }
}

export default MyApp;
