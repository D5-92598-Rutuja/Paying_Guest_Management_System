import { useState } from 'react'
import {Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
       <Navbar/>
       </div>
    </>
  )
}

export default App
