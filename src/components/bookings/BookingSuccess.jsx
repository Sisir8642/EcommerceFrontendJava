import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from'../layout/HeaderMain'



const BookingSuccess = () => {
    const location = useLocation()
    const message = location.state?.message
    const error = location.state?.error

  return (
    <div className='container'>
        <Header title="Booking Sucess" />
        <div className='mt-5'>
            {message ?(
                <div>
                    <h1 className='text-success'> Booking Success</h1>
                    <p className='text-success'>{message}</p>

                </div>
            ):(
                 <div>
                    <h1 className='text-danger'> Error Booking Room !!</h1>
                    <p className='text-success'>{error}</p>

                </div>
            )}

        </div>
      
    </div>
  )
}


export default BookingSuccess