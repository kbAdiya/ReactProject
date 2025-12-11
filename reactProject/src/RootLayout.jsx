import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import OfflineBanner from "./components/OfflineBanner";

export default function RootLayout() {
  return (
    <div>
      <Navbar /> 
      <OfflineBanner />
      <Outlet />
    </div>
  );
}
