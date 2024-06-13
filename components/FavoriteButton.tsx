import useFavoriteList from "@/hooks/useLocalFavoriteList";
import { FavoriteListProps } from "@/pages";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/solid";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface FavoriteButtonProps {
  movieId: string;
  favoriteList: FavoriteListProps[];
}

const useActiveUser = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const activeUser = JSON.parse(
      localStorage.getItem("activeUser") ?? '{"user": ""}'
    );
    if (activeUser.user !== "") {
      setUser(activeUser.user);
    }
  }, []);

  return user;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  movieId,
  favoriteList,
}) => {
  const user = useActiveUser();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const userFavorites = favoriteList.find((fav) => fav.user === user);
      if (userFavorites && userFavorites.favoriteIds.includes(movieId)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [user, movieId]);

  const ToggleFavorites = () => {
    if (!user) return;

    let myTempList = favoriteList;
    let isFavorite = myTempList
      .find((item) => item.user === user)
      ?.favoriteIds.includes(movieId);

    if (myTempList.some((item) => item.user === user)) {
      if (isFavorite) {
        myTempList = myTempList.map((tempItem) => ({
          user: tempItem.user,
          favoriteIds:
            tempItem.user === user
              ? tempItem.favoriteIds?.filter((favs) => favs !== movieId)
              : tempItem.favoriteIds,
        }));
      } else {
        myTempList = myTempList.map((tempItem) => ({
          user: tempItem.user,
          favoriteIds:
            tempItem.user === user
              ? [...tempItem.favoriteIds, movieId]
              : tempItem.favoriteIds,
        }));
      }
    } else {
      myTempList = [...myTempList, { user: user, favoriteIds: [movieId] }];
    }

    localStorage.setItem("favoriteList", JSON.stringify(myTempList));
    setIsFavorite(!isFavorite);
  };

  const Icon = isFavorite ? CheckIcon : PlusIcon;

  return (
    <div
      onClick={ToggleFavorites}
      className="cursor-pointer border-white rounded-full flex items-center 
      justify-center border-2 w-7 h-7 lg:w-11 lg:h-11 hover:border-neutral-400"
    >
      {<Icon className="text-white w-4 h-4 lg:w-8 lg:h-8" />}
    </div>
  );
};

export default FavoriteButton;
