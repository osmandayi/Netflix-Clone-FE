import { useState, useEffect } from 'react';

interface FavoriteListProps {
    user: string;
    favoriteIds: string[];
}

const useFavoriteList = () => {
    const [favoriteList, setFavoriteList] = useState<FavoriteListProps[]>([]);
    useEffect(() => {
        const localFavoriteList = localStorage.getItem("favoriteList");
        if (localFavoriteList) {
            try {
                const parsedList = JSON.parse(localFavoriteList);
                setFavoriteList(parsedList);
            } catch (error) {
                console.error("Error parsing favorite list from localStorage:", error);
                setFavoriteList([]);
            }
        }
    }, []);

    const updateFavoriteList = (updatedList: FavoriteListProps[]) => {
        setFavoriteList(updatedList);
        localStorage.setItem("favoriteList", JSON.stringify(updatedList));
    };

    return { favoriteList, updateFavoriteList };
};

export default useFavoriteList;
