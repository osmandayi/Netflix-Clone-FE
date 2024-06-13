import useInfoModalStore from "@/hooks/useInfoModalStore";
import useMovie from "@/hooks/useMovie";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useCallback, useEffect, useState } from "react";
import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import movieMockData from "@/movie";
import { FavoriteListProps } from "@/pages";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
  favoriteList: FavoriteListProps[];
}

const InfoModal: React.FC<InfoModalProps> = ({
  onClose,
  visible,
  favoriteList,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  const { movieId: movieID } = useInfoModalStore();
  const movies = movieMockData;

  const data = movies.find((movie) => movie.id === movieID);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose();
    // setTimeout(() => {
    // }, 1000);
  }, []);

  if (!visible || !data) {
    return null;
  }

  return (
    <div
      className="z-50 transition duration-300 bg-black bg-opacity-80 flex
    justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0"
    >
      <div className="relative w-auto mx-auto max-w-3xl rounded-xl overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } relative flex-auto bg-zinc-800`}
        >
          <div className="relative h-96">
            <video
              src={data?.videoUrl}
              poster={data?.thumbnailUrl}
              autoPlay
              muted
              className="w-full brightness-50 object-cover h-full"
            ></video>
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 bg-black rounded-full p-2"
            >
              <XMarkIcon className="w-6 text-white" />
            </div>
            <div className="absolute bottom-44 left-6">
              <p className="text-white text-xl md:text-2xl lg:text-4xl">
                {data?.title}
              </p>
              <div className="flex flex-row gap-4 items-center mt-5">
                <PlayButton movieId={data?.id} key={data?.id} />
                <FavoriteButton
                  movieId={data?.id}
                  key={data?.id}
                  favoriteList={favoriteList}
                />
              </div>
            </div>
          </div>
          <div className="px-12 py-10">
            <div className="flex flex-row items-center gap-2 mb-2">
              <p className="text-green-500 font-semibold text-lg">New</p>
            </div>
            <div className="text-white text-lg font-semibold mb-4">
              {data?.duration}
            </div>
            <div className="text-white text-lg font-semibold mb-10">
              {data?.genre}
            </div>
            <div className="text-white text-lg font-semibold">
              {data?.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
