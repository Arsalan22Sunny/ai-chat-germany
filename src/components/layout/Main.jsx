import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";

const LayoutMain = () => {
  return (
    <>
      <Navbar className="shrink-0"/>
      <div className="flex-grow overflow-scroll h-full">
        <Outlet />
      </div>
      <Footer className="shrink-0"/>
    </>
  );
};

export default LayoutMain;
