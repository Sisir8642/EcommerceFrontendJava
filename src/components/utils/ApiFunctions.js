import axios from "axios"
 

export const api = axios.create({
    baseURL: "http://darbar-hotel.onrender.com/",
})

export async function addRoom(photo, roomType, roomPrice) {
    const formData= new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/room/add/new-room", formData)
    if(response.status === 200){
        return true
    }else {
        return false
    }
}

export async function getRoomTypes() {
    try {
        const response = await api.get(`/room/room-types`);
        console.log("Response from /room/room-types:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching room types:", error);
        return []; // Return empty array on error
    }


}
export async function getAllRooms(){
     try{
       const result = await api.get("/room/all-rooms")
       return result.data

     } catch(error){
        throw new Error("Error fetching rooms")
 
     }
}

export async function deleteRoom(roomId){
    try {
        const result = await api.delete(`/room/delete/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error deleting a room ${error.message}`)
    }
}

export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
     const response = await api.put(`/room/update/${roomId}`, formData )
     return response; 
} 
  
export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/room/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching rooms ${error.message}`)
    }
    
}

export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        } else{
            throw new Error(`Error booking room: ${error.message}`)
        }
    }
    
}

export async function getAllBookings() {
    try {
        const result =  await api.get(`/bookings/all-bookings`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching bookings: ${error.message}`)
    }
    
}

export async function getBookingdByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
            
        } else {
            throw new Error(`Error find bookings: ${error.message}`)
        }
    }
    
}

export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
    } catch (error) {
        throw new Error(`Error canceling booking: ${error.message}`)
    }
    
}