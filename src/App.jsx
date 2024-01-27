import { useState } from 'react'
import './App.css'
import Showcase from './pages/Showcase'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className='text-red-400 h-full'>
    <Showcase/>
   </div>
  )
}

export default App
