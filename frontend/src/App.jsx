import { useState } from 'react'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

import  { OrderPage,StatusPage } from './Pages'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<OrderPage />}/>
        <Route path='/status' element={<StatusPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
