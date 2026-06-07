import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
function AppNav() {
  // These are Nested Routes inside the /app route:
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
