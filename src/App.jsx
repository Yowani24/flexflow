import { useState } from 'react'
import './App.css'
import KanbanView from './components/KanbanView'
import Header from './components/Header'
import SideBar from './components/SideBar'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
<div className="flex h-screen">
    <SideBar/>

    <div className="w-[100%] md:w-[90%] h-full md:ml-auto overflow-y-auto">
      <Header/>
      <KanbanView/>
      
    </div>
  </div>
    </QueryClientProvider>
  
  )
}

export default App
