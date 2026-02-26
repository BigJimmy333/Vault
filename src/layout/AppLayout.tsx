import { Outlet, NavLink } from "react-router-dom";
import "./AppLayout.css";

function AppLayout() {
  return (
    <div className="app-layout">
      {/* THIS is where pages render */}
      <Outlet />

      {/* Persistent bottom nav */}
      <nav className="bottom-nav">
        <NavLink to="/" end>
          Notes
        </NavLink>

        <NavLink to="/folders">
          Folders
        </NavLink>

        <NavLink to="/favorites">
          Favorites
        </NavLink>

        <NavLink to="/settings">
          Settings
        </NavLink>
      </nav>
    </div>
  );
}

export default AppLayout;
