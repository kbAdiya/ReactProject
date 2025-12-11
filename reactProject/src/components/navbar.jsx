import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css"
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useCallback } from "react";
import { useFavorites } from "../FavoritesContext";
function Navbar() {
    const { user } = useAuth();
  const navigate = useNavigate();
  const { mergeMessage } = useFavorites();

  // const handleLogout = async () => {
  //   await signOut(auth);
  //   navigate("/login");
  // };

    const handleLogout = useCallback(async () => {
    await signOut(auth);
    navigate("/login");
  }, [navigate])

 
  return (

    <nav className="navbar">
      
      {mergeMessage && (
        <div className="merge-notification">
          {mergeMessage}
        </div>
      )}
      <div className="nav-links">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/items">Discography</NavLink>
      <NavLink to="/favorites">
        My Favorites 
      </NavLink>
      {user ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <button onClick={handleLogout} className="logout-btn" >Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        )}
        </div>
    </nav>
  );
}

export default Navbar;
