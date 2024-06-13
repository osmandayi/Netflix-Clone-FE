import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavoriteMovies from "@/hooks/useFavorite";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import useMovieList from "@/hooks/useMovieList";
import movieMockData from "@/movie";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export interface FavoriteListProps {
  user: string;
  favoriteIds: string[];
}
export interface Movie {
  id: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  genre: string;
  duration: string;
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

export default function Home() {
  const movies: Movie[] = movieMockData;
  const user = useActiveUser();
  const router = useRouter();

  const { isOpen, closeModal } = useInfoModalStore();
  const [favoriteList, setFavoriteList] = useState<FavoriteListProps[]>([
    { user: "", favoriteIds: [""] },
  ]);
  let favoriteIds =
    favoriteList.find((fl) => fl.user === user)?.favoriteIds ?? [];

  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [router, user]);

  if (!user) {
    return null;
  }

  useEffect(() => {
    // İlk yüklemede localStorage'dan verileri al
    const loadFavoriList = () => {
      try {
        const storedFavoriteList = JSON.parse(
          localStorage.getItem("favoriteList") || "[]"
        );

        if (Array.isArray(storedFavoriteList)) {
          setFavoriteList(storedFavoriteList);
        } else {
        }
      } catch (error) {
        console.error("Failed to parse cart items from localStorage:", error);
      }
    };

    loadFavoriList();

    // localStorage değişikliklerini dinle
    const handleStorageChange = () => {
      loadFavoriList();
    };

    window.addEventListener("storage", handleStorageChange);

    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, [key, value]);
      if (key === "favoriteList") {
        handleStorageChange();
      }
    };

    // Temizleme işlemi
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      localStorage.setItem = originalSetItem;
    };
  }, []);

  useEffect(() => {
    setFavoriteMovies(movies.filter((movie) => favoriteIds.includes(movie.id)));
  }, [favoriteIds]);

  return (
    <>
      <main>
        <InfoModal
          visible={isOpen}
          onClose={closeModal}
          favoriteList={favoriteList}
        />
        <Navbar />
        <Billboard />
        <div className="p-6">
          <MovieList
            title="Trending"
            data={movies}
            favoriteList={favoriteList}
          />
          <MovieList
            title="Favorite List"
            data={favoriteMovies}
            favoriteList={favoriteList}
          />
        </div>
        <div className="h-96"></div>
      </main>
    </>
  );
}
