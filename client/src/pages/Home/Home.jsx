import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './Home.css'

export default function Home() {
  return (
    <div className="home-layout">

      <div className="home-content">
        <div className="home-sidebar">
          <Navbar />
        </div>
        <div className="home-outlet">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
