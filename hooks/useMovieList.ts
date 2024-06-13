import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useMovieList = () => {
    const { data, error, isValidating } = useSWR('/api/movies', fetcher, {
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


export default useMovieList;