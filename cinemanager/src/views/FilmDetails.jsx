import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/navBar/Navbar"; 
import imgFilm from "../assets/hero-image.jpg";

export default function FilmDetails() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [seances, setSeances] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/films/${id}`);
        console.log('khadama',response);
        
        if (!response.ok) {
          const errorData = await response.json(); 
          console.error('Error response:', errorData); 
          throw new Error('Failed to fetch film details: ' + errorData.message);
        }
        
        const data = await response.json();
        console.log('API response:', data.title); 
        
        
        if (data) {
          setFilm(data);
        //   setSeances(data.seances); 
        } else {
          console.error('No film found with the given ID:', id); 
          setError('No film found with the given ID');
        }
        
      } catch (error) {
        console.error('Error fetching film details:', error); 
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>; 
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; 
  }

  if (!film) {
    return <div>No film found.</div>; 
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <header className=" relative w-full h-screen bg-cover bg-center"  style={{ backgroundImage: `url(${film.image})` }} >
       
        <div className="bg-black bg-opacity-50 w-full h-full flex flex-col">
          <Navbar />
          <div className=" m-11 flex-grow flex justify-end flex-col text-white">
            <h1 className="text-5xl font-bold">{film.title}</h1>
            <p className="mt-4 text-lg max-w-2xl">
            {film.description}
              <span className="text-lg text-purple-500 cursor-pointer">
                {" "}
                See more.
              </span>
            </p>

            <div className=" m-5 font-bold flex gap-3">
              <div>
                <button className="bg-purple-500 mt-2 py-1 px-5 rounded-sm hover:bg-purple-800">Book Now</button>
              </div>
              <div>
                <h2>January 20,2024</h2>
                <span>50 MAD</span>
              </div>
            </div>
          </div>sm
        </div>
      </header>

      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-8">
         
          <div className="w-full md:w-1/3">
            <img
              src={film.image || imgFilm} 
              alt={film.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{film.title}</h1>
            <p className="text-gray-400 text-lg mb-4">{film.genre}</p>

            <div className="flex items-center mb-4">
              <span className="bg-yellow-200 text-black px-3 py-1 rounded-full text-sm font-bold">
                ⭐ 4.5
              </span>
              <span className="ml-4 text-gray-400">IMDB Rating</span>
            </div>

            <h2 className="text-2xl font-semibold mb-2">description</h2>
            <p className="text-gray-300 mb-6">{film.description}</p>
          

            <h2 className="text-2xl font-semibold mb-4">Showtimes (Séances)</h2>
            <div className="container mx-auto py-8">
              <div className="space-y-4">
                {seances.length > 0 ? (
                  seances.map((seance, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 rounded-lg p-4 flex justify-between items-center cursor-pointer"
                      onClick={() => handleSeanceClick(seance.id)} 
                    >
                      <div className="text-white text-lg">
                        Salle: {seance.salle}
                      </div>
                      <div className="text-yellow-400 text-lg">
                        {seance.time}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">
                    No showtimes available for this film.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
