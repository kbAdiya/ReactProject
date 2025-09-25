import { useState } from 'react'
import './App.css'
import About from './about'


function App() {
  const [count, setCount] = useState(0)

  return (
   <About></About>
  )
}

export default App
