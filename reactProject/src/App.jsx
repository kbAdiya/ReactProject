
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./RootLayout";
import './App.css'
import About from './components/about'
import MainBTS from './mainBTS'
import Discography from './discography'
import AlbumDetails from './discographyDetails'
import Login from "./authcomp/login";
import Signup from "./authcomp/signup";
import Profile from "./authcomp/profile";
import Favorites from "./favorites";
function App() {
  
  return (
    <div>

     <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<MainBTS />} />
          <Route path="about" element={<About />} />
          <Route path="items" element={<Discography/>} />
          <Route path="items/:id" element={<AlbumDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile"element={<Profile />}/>
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
