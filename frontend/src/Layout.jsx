import GlobalHeader from "./components/GlobalHeader";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen">
      <GlobalHeader />
      <Outlet />
    </div>
  )
}

export default Layout;