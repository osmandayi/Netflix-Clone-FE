"use client";
import movieMockData from "@/movie";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import React from "react";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query; // router.query üzerinden movieId'yi al

  const movies = movieMockData;

  const data = movies?.find((movie) => movie.id === movieId);

  return (
    <div className="h-screen w-screen bg-black">
      <nav
        className="fixed w-full p-6 z-20 flex flex-row items-center gap-10 
      bg-black bg-opacity-70"
      >
        <ArrowLeftIcon
          onClick={() => router.push("/")}
          className="w-4 md:w-8 lg:w-12 text-white cursor-pointer 
        hover:opacity-80 transition duration-0 hover:duration-700"
        />
        <p
          className="text-white text-xl md:text-2xl lg:text-3xl 
        font-semibold"
        >
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>
      <video src={data?.videoUrl} controls className="h-full w-full"></video>
    </div>
  );
};

export default Watch;
