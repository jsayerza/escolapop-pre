import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "../context/authContext";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <AuthContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        {/* Same as */}
      <ToastContainer />

      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
