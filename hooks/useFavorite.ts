import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useFavoriteMovies = () => {
    const { data, error, isValidating } = useSWR('/api/favoriteList', fetcher, {
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
    });


    return {
        data,
        error,
        isValidating,
    }
};


export default useFavoriteMovies;