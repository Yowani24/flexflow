import { useState } from 'react'
import './App.css'
import KanbanView from './components/KanbanView'
import Header from './components/Header'
import SideBar from './components/SideBar'

function App() {
  return (
  <div className="flex h-screen">
    <SideBar/>

    <div className="w-[90%] h-full md:ml-auto overflow-y-auto">
      <Header/>
      <KanbanView/>
      
    </div>
  </div>
  )
}

export default App
