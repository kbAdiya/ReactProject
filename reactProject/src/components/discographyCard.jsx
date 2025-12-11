import { Link } from "react-router-dom";
import "../styles/albumCard.css"
import { useFavorites } from "../FavoritesContext";
export default function Card({ album }) {
  

  const { isFavorite, toggleFavorite } = useFavorites();
  
  const isLiked = isFavorite(album.id);

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(album);
  };
  return (
    <div className="album-card">

      <Link to={`/items/${album.id}`} className="album-card-link">
      <div className="album-cover">
        <img src={album.coverUrl} alt={album.title} />
      </div>

      <div className="album-info">
        <h3 className="album-title">{album.title}</h3>
        <p className="album-date">First release: {album.date}</p>
      
      </div>
      </Link>
      <button 
        onClick={handleHeartClick}
        className={`favorite-btn ${isLiked ? "active" : ""}`}
      >
        {isLiked ? "♥" : "♡"}
      </button>
     
    </div> 
  ); 
}
