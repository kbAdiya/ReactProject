import React from "react";

import Card from "./components/discographyCard";
import { useFavorites } from "./FavoritesContext";
export default function Favorites() {
  
const { favorites, loading } = useFavorites();

  return (
    <section className="album-list-section">
      <h1>My Favorites</h1>

      {loading && <div className="loading-spinner">Loading favorites...</div>}

      {!loading && (
        <>
          
          {favorites.length === 0 ? (
            <div className="empty-state">
              <p>You haven't added any albums to favorites yet.</p>
              <p>Go to the Discography to add some!</p>
            </div>
          ) : (
            
            <div className="album-grid">
              {favorites.map((album) => (
                <Card key={album.id} album={album} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}