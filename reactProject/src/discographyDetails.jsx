import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbumById, clearSelectedItem } from "./features/albumSlice"
import Spinner from "./components/spinnig";
import ErrorBox from "./components/errorBox";
import "./styles/albumDetails.css"
export default function AlbumDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  const { selectedItem, loadingItem, errorItem } = useSelector((state) => state.albums);

  useEffect(() => {
    if (id) {
      dispatch(fetchAlbumById(id));
    }
    
    return () => {
      dispatch(clearSelectedItem());
    };
  }, [dispatch, id]);

  if (loadingItem) return <Spinner/>
  
  if (errorItem) return (
    <div className="error">
        <ErrorBox message="Failed to load detail about album" />
        <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );

  if (!selectedItem) return null;

  return (
    <div className="album-details" >

      <div className="album-cover">
      {selectedItem.coverUrl && (
      <img src={selectedItem.coverUrl} alt={selectedItem.title} width="300" />
      )}
     </div>

     <div className="album-info">
      <h1>{selectedItem.title}</h1>
      <div className="info-row"><span className="label">Artist:</span> {selectedItem["artist-credit"]?.[0]?.name || "N/A"}</div>
    <div className="info-row"><span className="label">First Release:</span> {selectedItem["first-release-date"] || "N/A"}</div>
     <div className="info-row"><span className="label">Genres:</span> {selectedItem.genres?.map(g => g.name).join(", ") || "N/A"}</div>
      <div className="info-row">
      <span className="label">Primary Type:</span> {selectedItem["primary-type"] || "N/A"}
      </div>
    </div>
   
   <div className="tracks-section">
      {selectedItem.tracks && (
        <div>
          <h3>Tracks</h3>
          <ul>
            {selectedItem.tracks.map((track) => (
              <li key={track.id}>
                {track.number}. {track.title} 
              </li>
            ))}
          </ul>
        </div>
      )}

        <button onClick={() => navigate(-1)} >
        Back to List
      </button>
    </div>

  </div>
  );
}