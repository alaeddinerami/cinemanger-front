import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/header/Header'; // Assuming you have a Header component
const totalSeats = 50; // Example of total seats available in the cinema

export default function SeatSelection() {
  const { seanceId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Example function to handle seat selection
  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      // If the seat is already selected, remove it
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      // Otherwise, add it to the selection
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleReserveSeats = () => {
    // Process seat reservation (e.g., API call to reserve seats)
    console.log('Reserving seats:', selectedSeats);
    alert(`You have reserved the following seats: ${selectedSeats.join(', ')}`);
    // Here, you would send the selectedSeats to the server for reservation.
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Select Your Seats</h1>
        <p className="text-gray-400 mb-4">Séance ID: {seanceId}</p>
        <div className="grid grid-cols-10 gap-2 mb-8">
          {Array.from({ length: totalSeats }, (_, index) => {
            const seatNumber = index + 1;
            return (
              <button
                key={seatNumber}
                className={`p-2 border rounded-lg text-center cursor-pointer
                ${
                  selectedSeats.includes(seatNumber)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
                onClick={() => handleSeatClick(seatNumber)}
              >
                {seatNumber}
              </button>
            );
          })}
        </div>

        {selectedSeats.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Selected Seats:</h2>
            <p>{selectedSeats.join(', ')}</p>
          </div>
        )}

        <button
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
          onClick={handleReserveSeats}
        >
          Reserve Seats
        </button>
      </div>
    </div>
  );
}
