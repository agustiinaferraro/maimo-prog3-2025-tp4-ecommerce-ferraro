'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "./Loading";

const Hero = () => {
  const [concerts, setConcerts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const res = await fetch("http://localhost:4000/tours");
        if (!res.ok) throw new Error("Error al traer conciertos");
        const data = await res.json();
        const processed = data.concerts.map(item => ({
          ...item,
          id: item._id,
          date: new Date(item.date).getTime(),
        }));
        setConcerts(processed);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchConcerts();
  }, []);

  useEffect(() => {
    if (!concerts || concerts.length === 0) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % concerts.length);
        setFade(true);
      }, 500);
    }, 10000);
    return () => clearInterval(interval);
  }, [concerts]);

  if (loading)
    return (
      <div className="h-[400px] md:h-[500px] bg-black flex items-center justify-center text-white">
        <Loading />
      </div>
    );

  const currentConcert = concerts[currentIndex];
  if (!currentConcert) return <Loading />;

  return (
    <Link
      href={`/entradas/${currentConcert.id}`}
      className="block w-full h-[400px] md:h-[500px] relative overflow-hidden rounded-2xl"
    >
      {/*fondo negro entre videos */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      ></div>

      {/*video local */}
      <video
        key={currentConcert.id}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        src={`http://localhost:4000${currentConcert.videoUrl}`}
        autoPlay
        muted
        loop
        playsInline
      />

      {/*gradiente para texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/90"></div>

      {/*info del recital */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-5 md:px-20 z-10 text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">{currentConcert.venue}</h1>
        <h2 className="text-xl md:text-2xl mb-2">{currentConcert.city}</h2>
        <p className="text-gray-300">
          {new Date(currentConcert.date).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
};

export default Hero;
