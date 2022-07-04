import { ToastContainer } from "react-toastify";
import { Navbar } from "./Navbar";

export function Layout({ children, privateLinks = false }) {
  return (
    <>
      <Navbar privateArea={privateLinks} />

      <div className="bg-gray-100 h-full p-10 mt-16">
        <div className="container mx-auto h-full">{children}</div>
      </div>
      <ToastContainer />
      <style jsx global>
        {`
          body {
            overflow-x: hidden;
          }
        `}
      </style>
    </>
  );
}

export default Layout;
