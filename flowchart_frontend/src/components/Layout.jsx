import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <>
      <div className="flex">
        <div className="bg-[#41AEF2] rounded-tr-badge  fixed h-[100vh] w-48 left-0  ">
          <Sidebar />
        </div>
        <div className="w-full ml-48">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
