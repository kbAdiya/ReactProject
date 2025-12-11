import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums } from "./features/albumSlice";
import useDebounce from "./hooks/useDebounce";
import Card from "./components/discographyCard"; 
import ErrorBox from "./components/errorBox";
import Spinner from "./components/spinnig";
import "./styles/albumList.css"

export default function AlbumsList() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();


  const searchQuery = searchParams.get("q") || "";

 const debouncedQuery = useDebounce(searchQuery, 1000);
const { list, total, loadingList, errorList } = useSelector((state) => state.albums);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || total);

  
  const abortControllerRef = useRef(null);


  useEffect(() => {
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

   
    dispatch(fetchAlbums({ query: debouncedQuery, page, limit, signal: abortControllerRef.current.signal, }));

    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [dispatch, debouncedQuery, page, limit]);

  const handleSearch = (e) => {
    setSearchParams({ q: e.target.value, page: 1, limit });
  };
 
  const changePage = (newPage) => {
    setSearchParams({ q: searchQuery, page: newPage, limit });
  };
 
 
  const changeLimit = (e) => {
    setSearchParams({ q: searchQuery, page: 1, limit: Number(e.target.value) });
  };

  const clearSearch = () => {
    setSearchParams({ page: 1, limit });
  };

  
  const totalPages = Math.ceil(total / limit);
  
  const sortedAlbums = useMemo(() => {
  return [...list].sort((a, b) => {

    return new Date(a.date) - new Date(b.date);
  });
   }, [list]);
  return (
    <section className="album-list-section">
      <h1>BTS Albums</h1>

      <div className="controls">
        <input className="search-input"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button onClick={clearSearch} className="clear-btn">Clear</button>
         <label>Items per page: </label>
        <select value={limit} onChange={changeLimit} className="limit-select">
          <option value={total}>full</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

     

      
      {loadingList && <Spinner />}

      {!loadingList && errorList && <ErrorBox message={errorList} />}

     
      {!loadingList && !errorList && (
        <>
          {sortedAlbums.length === 0 ? (
            <p>No albums found.</p>
          ) : (
            <>
              <div className="album-grid">
                {sortedAlbums.map((album) => (
                  <Card key={album.id} album={album} />
                ))}
              </div>

             
              {total > 0 && (
                 <div className="pagination" >
                    <button disabled={page <= 1} onClick={() => changePage(page - 1)}>Prev</button>
                    <span >Page {page} of {totalPages}</span>
                    <button disabled={page >= totalPages} onClick={() => changePage(page + 1)}>Next</button>
                 </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
