import React from "react";
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { MovieInterface } from "@/types";
import { FavoriteListProps } from "@/pages";

interface MovieListInterface {
  data: MovieInterface[];
  title: string;
  favoriteList: FavoriteListProps[];
}

const MovieList: React.FC<MovieListInterface> = ({
  data,
  title,
  favoriteList,
}) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="px-4 space-y-6">
      <div className="">
        <p className="text-white text-lg md:text-xl lg:text-2xl font-semibold my-5">
          {title}
        </p>
        <div className="gap-2">
          <Swiper
            watchSlidesProgress={true}
            slidesPerView={2}
            spaceBetween={10}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 25,
              },
              1200: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
            }}
            className="min-h-72"
          >
            {data?.map((item, index) => (
              <SwiperSlide className="hover:scale-105" key={index}>
                <MovieCard
                  data={item}
                  key={item.id}
                  favoriteList={favoriteList}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
