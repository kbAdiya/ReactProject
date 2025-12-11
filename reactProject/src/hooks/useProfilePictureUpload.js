import { useState, useCallback, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export function useProfilePictureUpload(uid) {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob); 
    });
  };

 
  useEffect(() => {
    if (!uid) return;

    const fetchProfilePicture = async () => {
      try {
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.profilePicture) {
            setUrl(data.profilePicture);
          }
        }
      } catch (err) {
        console.error("Error fetching profile picture:", err);
        setError(err.message);
      }
    };

    fetchProfilePicture();
  }, [uid]);

  const upload = useCallback(async (file) => {
    if (!file || !uid) return;
    setLoading(true);
    setError(null);

    try {
      const worker = new Worker(
        new URL("../workers/compressWorker.js", import.meta.url),
        { type: "module" }
      );

      const compressedBlob = await new Promise((resolve, reject) => {
        worker.postMessage(file);
        worker.onmessage = (e) => resolve(e.data);
        worker.onerror = (e) => reject(e);
      });

      worker.terminate();
      const base64 = await blobToBase64(compressedBlob);
      const userDocRef = doc(db, "users", uid);
      await setDoc(userDocRef, { profilePicture: base64 }, { merge: true });

      setUrl(base64);

    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [uid]);

  return { url, loading, error, upload };
}
