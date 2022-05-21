import { ToastContainer } from "react-toastify";
import { Navbar } from "./Navbar";

export function Layout({ children }) {
  return (
    <>
      <Navbar />

      <div className="bg-gray-100 h-full p-10 mt-16">
        <div className="container mx-auto h-full">{children}</div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Layout;
