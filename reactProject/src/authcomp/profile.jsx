import { useAuth } from "../AuthContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate, Navigate } from "react-router-dom";
import Spinner from '../components/spinnig.jsx'
import { useProfilePictureUpload } from "../hooks/useProfilePictureUpload.js";
import "../styles/profile.css"
import defaultAvatar from "./default-avatar.png"

export default function Profile() {
  
  const navigate = useNavigate();
const { user, loading: authLoading } = useAuth();
const { url, loading: uploadLoading, error, upload } = useProfilePictureUpload(user?.uid);

 

 
  if (authLoading || uploadLoading) return <Spinner />;


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="profile-container">
    <section className="profile">
      <img 
      src={url || defaultAvatar} 
      alt="Profile" 
      style={{ width: "150px", borderRadius: "50%" }} 
      onError={(e) => {
       
        if (e.target.src !== defaultAvatar) {
          e.target.src = defaultAvatar;
        }
      }}
      />

      <label className="file-upload-label">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              upload(file);
              e.target.value = '';
            }
          }}
          className="file-upload-input"
        />
        <span className="file-upload-button">Upload Photo</span>
      </label>

        {error && <p style={{ color: "red" }}>{error}</p>}
      <h1>Profile</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>UID:</strong> {user.uid}</p>

      <div >
        <button onClick={handleLogout}>Logout</button>
      </div>
    </section>
    </div>
  );
}
