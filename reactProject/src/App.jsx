import { useState } from 'react'
import './App.css'
import About from './about'
import MainBTS from './mainBTS'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
   
   <MainBTS></MainBTS>
   <About></About>
   </div>
  )
}

export default App
