import React, { useState } from "react";

const FIndbooking = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  const fetchBooking = async () => {
    try {
      setError("");
      const response = await fetch(
        `https://ecommerce-backend-latest-sms8.onrender.com/bookings/confirmation/${confirmationCode}`
      );
      if (!response.ok) throw new Error("Booking not found");
      const data = await response.json();
      setBooking(data);
    } catch (err) {
      setBooking(null);
      setError(err.message);
    }
  };

  const checkoutBooking = async (bookingId) => {
    try {
      await fetch(
        `https://ecommerce-backend-latest-sms8.onrender.com/bookings/booking/${bookingId}/delete`,
        { method: "DELETE" }
      );
      alert("Checkout successful!");
      setBooking(null);
      setConfirmationCode("");
    } catch (err) {
      alert("Checkout failed. Try again.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Find My Booking</h2>

      <input
        type="text"
        value={confirmationCode}
        onChange={(e) => setConfirmationCode(e.target.value)}
        placeholder="Enter confirmation code"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={fetchBooking}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {booking && (
        <div className="mt-4 border p-4 rounded bg-gray-50">
          <h3 className="font-semibold">Booking Details</h3>
          <p>Guest: {booking.guestFullName}</p>
          <p>Email: {booking.guestEmail}</p>
          <p>Room: {booking.room.roomType}</p>
          <p>Check-in: {booking.checkInDate}</p>
          <p>Check-out: {booking.checkOutDate}</p>
          <p>Confirmation Code: {booking.bookingConfirmationCode}</p>

          <button
            onClick={() => checkoutBooking(booking.bookingId)}
            className="bg-red-600 text-white px-4 py-2 mt-3 rounded"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default FIndbooking;
