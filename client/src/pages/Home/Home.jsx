import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
// import './Home.css'

export default function Home() {
  return (
    <div>
        <Navbar />
        <Outlet/>
    </div>
  )
}
