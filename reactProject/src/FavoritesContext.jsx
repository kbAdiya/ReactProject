import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { favoritesService } from "./services/favoritesService"
import { useAuth } from "./AuthContext"; 

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  
  const { user, loading: authLoading } = useAuth(); 

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mergeMessage, setMergeMessage] = useState("");

  useEffect(() => {
    
    if (authLoading) return;

    async function initializeFavorites() {
      setLoading(true);
      const uid = user ? user.uid : null;

      if (uid) {
        const merged = await favoritesService.mergeFavorites(uid);
        if (merged) {
          setMergeMessage("Your local favorites were merged with your account.");
          setTimeout(() => setMergeMessage(""), 4000);
        }
      }

      try {
        const data = await favoritesService.getFavorites(uid);
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    }

    initializeFavorites();
  }, [user, authLoading]); 

  const toggleFavorite = useCallback( async (album) => {
    const uid = user ? user.uid : null;
    const isAlreadyFavorite = favorites.some(fav => fav.id === album.id);

    if (isAlreadyFavorite) {
      setFavorites(prev => prev.filter(item => item.id !== album.id));
      await favoritesService.removeFavorite(uid, album);
    } else {
      setFavorites(prev => [...prev, album]);
      await favoritesService.addFavorite(uid, album);
    }
  }, [favorites, user])

  const isFavorite =useCallback( (id) => favorites.some(item => item.id === id),[favorites]);

  const value = {
    favorites,
    loading,
    mergeMessage,
    toggleFavorite,
    isFavorite
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  return useContext(FavoritesContext);
}