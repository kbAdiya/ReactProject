import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux"; 
import { store } from "./store";
import { AuthProvider } from './AuthContext.jsx';
import { FavoritesProvider } from "./FavoritesContext.jsx"



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
       <AuthProvider>
        <FavoritesProvider>
    <App />
        </FavoritesProvider>
    </AuthProvider>
    </Provider>
  </StrictMode>,
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then((reg) => console.log("SW registered:", reg))
      .catch((err) => console.log("SW registration failed:", err));
  });
}
