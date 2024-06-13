import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useMovie = (id?: string) => {
    const { data, error, isValidating } = useSWR(id ? `/api/movies/${id}` : null, fetcher, {
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


export default useMovie;