import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useBillboard = () => {
    const { data, error, isValidating } = useSWR('/api/randomMovie', fetcher, {
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


export default useBillboard;