import React from 'react'
import './App.css'
import AddRoom from './components/room/AddRoom'
import ExistingRooms from './components/room/ExistingRooms'
import {Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import EditRoom from './components/room/EditRoom'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import RoomListing from './components/room/RoomListing'
import Admin from './components/admin/Admin'
import BookingSuccess from './components/bookings/BookingSuccess'
import Checkout from './components/bookings/Checkout'
import FIndbooking from './components/bookings/FIndbooking'

function App() {

  return (
   <>

  <main>
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit-room/:roomId" element={<EditRoom />} />
        <Route path="/existing-rooms" element={<ExistingRooms />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/browse-all-rooms" element={<RoomListing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/book-room/:roomId" element={<Checkout />} />
       <Route path="/booking-success" element={<BookingSuccess />} />
       <Route path="/find-booking" element={<FIndbooking />} />
      </Routes>
      <Footer/>
  </main>
    </>
  )
}

export default App
