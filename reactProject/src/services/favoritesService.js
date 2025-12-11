import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import {db} from "../firebase"

const LS_KEY = "bts_favorites"; 

export const favoritesService = {
 
  async getFavorites(uid) {
    if (!uid) {
      const localData = localStorage.getItem(LS_KEY);
      return localData ? JSON.parse(localData) : [];
    } else {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data().favorites || [];
      }
      return [];
    }
  },


  async addFavorite(uid, album) {
    if (!uid) {
      const current = this._getLocal();
      if (!current.find(i => i.id === album.id)) {
        current.push(album);
        localStorage.setItem(LS_KEY, JSON.stringify(current));
      }
      return current;
    } else {
      const userDocRef = doc(db, "users", uid);
      await setDoc(userDocRef, { favorites: arrayUnion(album) }, { merge: true });
      return album;
    }
  },

  
  async removeFavorite(uid, album) {
    if (!uid) {
      let current = this._getLocal();
      current = current.filter(item => item.id !== album.id);
      localStorage.setItem(LS_KEY, JSON.stringify(current));
      return current;
    } else {
      const userDocRef = doc(db, "users", uid);
    
      await updateDoc(userDocRef, { favorites: arrayRemove(album) });
      return album;
    }
  },

  async mergeFavorites(uid) {
    if (!uid) return false;
    const localData = this._getLocal();
    if (localData.length > 0) {
      const userDocRef = doc(db, "users", uid);
      await setDoc(userDocRef, { favorites: arrayUnion(...localData) }, { merge: true });
      localStorage.removeItem(LS_KEY);
      return true;
    }
    return false;
  },

  _getLocal() {
    const data = localStorage.getItem(LS_KEY);
    return data ? JSON.parse(data) : [];
  }
};