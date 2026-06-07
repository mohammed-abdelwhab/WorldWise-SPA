import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/** Nested routes placeholder: Outlet react router element */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
