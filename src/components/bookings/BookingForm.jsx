import React, { useEffect, useState } from 'react'
import { getRoomById } from '../utils/ApiFunctions'
import { bookRoom } from '../utils/ApiFunctions';
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import BookingSummary from './BookingSummary'
import { Form,
   FormControl } from 'react-bootstrap'
const BookingForm = () => {

    const [isValidated, setIsValidated] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [roomPrice, setRoomPrice] = useState(0)
    const [booking, setBooking] = useState({
        guestFullName : "",
        guestEmail : "",
        checkInDate : "",
        checkOutDate : "",
        numberOfAdults : "",
        numberOfChildren : "",
})


const [roomInfo, setRoomInfo ] = useState({
  photo: "",
  roomType:"",
  roomPrice:""
})

const{roomId} = useParams()
const navigate = useNavigate()

const handleInputChange= (e) =>{
  const {name, value} = e.target
  setBooking({...booking, [name]: value})
  setErrorMessage("")
}

const getRoomPriceById = async(roomId) =>{
  try {
    const response = await getRoomById(roomId)
     console.log("Fetched room data:", response); 
    setRoomPrice(response.roomPrice)
    setRoomInfo(response);
  } catch (error) {
    console.error("Failed to fetch room price:", error); 
  }
}

useEffect(() =>{
  console.log("roomId from URL:", roomId);
getRoomPriceById(roomId)
}, [roomId])

const calculatePayment = () => {
  const checkInDate = moment(booking.checkInDate, "YYYY-MM-DD");
  const checkOutDate = moment(booking.checkOutDate, "YYYY-MM-DD");
  const diffInDays = checkOutDate.diff(checkInDate, "days");
  const price = roomPrice ? roomPrice : 0
  return diffInDays * price
};

const isGuestCountValid = () =>{
  const adultCount= parseInt(booking.numberOfAdults)
  const childrenCount = parseInt(booking.numberOfChildren)
  const totalCount = adultCount + childrenCount
  return totalCount>= 1 && adultCount >= 1
}

const isCheckOutDateValid = () => {
  const checkInDate = moment(booking.checkInDate, "YYYY-MM-DD");
  const checkOutDate = moment(booking.checkOutDate, "YYYY-MM-DD");

  if (!checkOutDate.isSameOrAfter(checkInDate)) {
    setErrorMessage("Check-out date must come after check-in date");
    return false;
  } else {
    setErrorMessage("");
    return true;
  }
};


const handleSubmit =(e) =>{
  e.preventDefault()
  const form = e.currentTarget
  if(form.checkValidity()===false 
  || !isGuestCountValid() ||
   !isCheckOutDateValid()){
  e.stopPropagation()
 }else{
  setIsSubmitted(true)
  }
  setIsValidated(true)
}

const handleBooking = async () =>{
  try {
   
    const confirmationCode = await bookRoom(roomId, booking)
     console.log("confirmation code is : ", confirmationCode)
    setIsSubmitted(true)
    navigate("/booking-success", {state: {message: confirmationCode}})
  } catch (error) {
      setErrorMessage("Booking failed: " + error.message);
  }
}


  return (
    <>

    <div className='container mb-5'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='card card-body mt-5'>
            <h4 className='card card-title'> Reserve Room</h4>
            <Form noValidate validated ={isValidated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="guestFullName">Full Name :</Form.Label>
              <FormControl
                required 
                type = "text"
                id ='guestFullName'
                name= "guestFullName"
                value={booking.guestFullName}
                placeholder= "Enter your full name"
                onChange ={handleInputChange}
                />

                <Form.Control.Feedback type = 'invalid'>
                  Please enter your fullname
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                <Form.Label htmlFor="guestEmail">Email :</Form.Label>
              <FormControl
                required 
                type = "email"
                id ='guestEmail'
                name= "guestEmail"
                value={booking.guestEmail}
                placeholder= "Enter your email"
                onChange ={handleInputChange}
                />

                <Form.Control.Feedback type = 'invalid'>
                  Please enter your email address
                </Form.Control.Feedback>
                </Form.Group>

                <fieldset style= {{border:"2px"}}>
                  <legend> Loading period </legend>
                  <div className='row'> 

                <div className='col-6'>
                <Form.Label htmlFor="check-InDate">
                  Check-In date :</Form.Label>
              <FormControl
                required 
                type = "date"
                id ='check-InDate'
                name= "checkInDate"
                value={booking.checkInDate}
                placeholder= "check-In date"
                onChange ={handleInputChange}
                />

                <Form.Control.Feedback type = 'invalid'>
                  Please select a check- In date
                </Form.Control.Feedback> 
                </div>


                <div className='col-6'>
                <Form.Label htmlFor="check-OutDate">
                  Check-Out date :</Form.Label>
              <FormControl
                required 
                type = "date"
                id ='checkOutDate'
                name= "checkOutDate"
                value={booking.checkOutDate}
                placeholder= "check-Out date"
                onChange ={handleInputChange}
                />

                <Form.Control.Feedback type = 'invalid'>
                  Please select a check-Out Date
                </Form.Control.Feedback>
                </div>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                </div>

                </fieldset>

                <fieldset>
                  <legend>Number of guest </legend>
                <div className='row'> 

              <div className='col-6'>
              <Form.Label htmlFor="numberofAdults">
                 Adults :</Form.Label>
              <FormControl
                required 
                type = "number"
                id ='numberofAdults'
                name= "numberOfAdults"
                value={booking.numberOfAdults}
                placeholder= "0"
                min={1}
                onChange ={handleInputChange}
                />

                <Form.Control.Feedback type = 'invalid'>
                  Please select at least one adult.
                </Form.Control.Feedback> 
                </div>


                <div className='col-6'>
              <Form.Label htmlFor="numberOfChildren">
                 No of Children :</Form.Label>
              <FormControl
                required 
                type = "number"
                id ='numberOfChildren'
                name= "numberOfChildren"
                value={booking.numberOfChildren}
                placeholder= "0"
                onChange ={handleInputChange}
                />
                </div>

                </div>
                </fieldset>

                <div className='form-group mt-2 mb-2'>
                  <button type='submit' className='btn btn-hotel'>
                    Continue</button>

                </div>

            </Form>
          </div>

        </div>

        <div className='col-md-6'>
          {isSubmitted && (
            <BookingSummary 
            booking={booking}
            payment={calculatePayment}
            isFormValid={isValidated}
            onConfirm={handleBooking}
            />
          )}
        </div>

      </div>


    </div>
      
    </>
  )
}

export default BookingForm
