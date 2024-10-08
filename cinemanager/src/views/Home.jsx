import React, { useState, useEffect } from "react";
import Header from "../Components/header/Header";
import Card from "../Components/card/Card";
import Filter from "../Components/filter/Filter";
import SeanceCarousel from "../Components/seanceCarousel/SeanceCarousel";
import axios from "axios";

const Home = () => {
  const [films, setFilms] = useState([]);
  const [seances, setSeances] = useState([]);
  const [filmError, setFilmError] = useState(null);
  const [seanceError, setSeanceError] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setFilmError("Failed to fetch films.");
      }
    };

    const fetchSeances = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/seances", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSeances(response.data);
      } catch (error) {
        console.error("Error fetching seances:", error);
        setSeanceError("Failed to fetch seances.");
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchFilms(), fetchSeances()]);
      setLoading(false);
    };

    fetchData();
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
          {filmError && <p className="text-red-500">{filmError}</p>}
          {loading ? (
            <p className="text-white">Loading films...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {films.map((film) => (
                <Card
                  key={film._id}
                  imgSrc={film.image}
                  title={film.title}
                  genre={film.genre}
                  id={film._id}
                />
              ))}
            </div>
          )}
        </section>

        <section className="p-5">
          <h2 className="text-white text-2xl font-bold mb-4">Seances</h2>
          {seanceError && <p className="text-red-500">{seanceError}</p>}
          {loading ? (
            <p className="text-white">Loading seances...</p>
          ) : (
            <SeanceCarousel seances={seances} />
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
