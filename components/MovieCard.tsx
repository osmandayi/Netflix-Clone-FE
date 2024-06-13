import React, { useCallback } from "react";
import { ChevronDownIcon, PlayIcon } from "@heroicons/react/24/solid";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/navigation";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import { MovieInterface } from "@/types";
import { FavoriteListProps } from "@/pages";

interface MovieCardProps {
  data: MovieInterface;
  favoriteList: FavoriteListProps[];
}

const MovieCard: React.FC<MovieCardProps> = ({ data, favoriteList }) => {
  const router = useRouter();

  const { openModal } = useInfoModalStore();

  const redirectToWatch = useCallback(() => {
    router.push(`/watch/${data.id}`);
  }, [router, data.id]);

  return (
    <div className="group bg-zinc-800 col-span-1 relative h-52">
      <img
        onClick={redirectToWatch}
        src={data.thumbnailUrl}
        alt=""
        className="h-52 w-full object-cover cursor-pointer
        shadow-xl rounded-lg group-hover:opacity-70"
      />
      <div
        className="opacity-0 w-full group-hover:opacity-100  z-20 absolute h-full
       top-0 scale-0 group-hover:scale-105 invisible sm:visible"
      >
        <img
          onClick={redirectToWatch}
          src={data.thumbnailUrl}
          alt=""
          className="h-18 w-full object-cover cursor-pointer
        shadow-xl rounded-lg group-hover:opacity-85"
        />
        <div
          className="z-20 bg-zinc-800 p-2 lg:p-4 absolute w-full
        shadow-lg rounded-b-md"
        >
          <div className="flex flex-row items-center gap-4">
            <div
              className="bg-white rounded-full w-7 lg:w-11 
            h-7 lg:h-11 flex items-center justify-center transition
            hover:border-neutral-300 border-white border-2
            cursor-pointer"
            >
              <PlayIcon
                onClick={redirectToWatch}
                className="text-black w-4 lg:w-6"
              />
            </div>
            <div className="">
              <FavoriteButton movieId={data.id} favoriteList={favoriteList} />
            </div>
            <div
              className="ml-auto rounded-full w-7 lg:w-11 
            h-7 lg:h-11 flex items-center justify-center transition
            hover:border-neutral-300 border-white border-2
            cursor-pointer"
            >
              <ChevronDownIcon
                onClick={() => openModal(data?.id)}
                className="text-white w-4 lg:w-6"
              />
            </div>
          </div>
          <p className="text-green-500 font-semibold mt-4 text-sm">
            New <span className="ml-2 text-white">2024</span>
          </p>
          <div className="flex flex-row mt-2 gap-2 items-center">
            <p className="text-white text-sm">{data.duration}</p>
          </div>
          <div className="flex flex-row mt-2 gap-2 items-center">
            <p className="text-white text-sm">{data?.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
