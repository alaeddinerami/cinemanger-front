import React, { useState, useEffect } from "react"; 
import Header from "../Components/header/Header";
import Card from "../Components/card/Card"; 
import Filter from "../Components/filter/Filter";
import SeanceCarousel from "../Components/seanceCarousel/SeanceCarousel"; 
import axios from "axios"; 

const Home = () => {
  const [films, setFilms] = useState([]);
  const [seances, setSeances] = useState([]); 
  const [error, setError] = useState(null); 

  useEffect(() => {

    const fetchFilms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/films", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        });
        setFilms(response.data); 
      } catch (error) {
        console.error("Error fetching films:", error);
        setError("Failed to fetch films."); 
      }
    };

    fetchFilms(); 
  }, []); 

  return (
    <div className="bg-black">
      <Header />
      <main className="p-5">
       
        <div>
          <Filter />
        </div>

       
        <section className="p-5">
          <h2 className="text-white text-2xl font-bold mb-4">Films</h2>
          {error && <p className="text-red-500">{error}</p>} 
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {films.map((film) => {
              console.log(film.image);
              return (
                <Card
                  key={film._id} 
                  imgSrc={film.image}
                  title={film.title}
                  genre={film.genre}
                  id={film._id}
                />
              );
            })}
          </div>
        </section>

       
        <section className="p-5">
          <h2 className="text-white text-2xl font-bold mb-4">Seances</h2>
          <SeanceCarousel seances={seances} />
        </section>
      </main>
    </div>
  );
};

export default Home;