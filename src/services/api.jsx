import { useState, useEffect } from 'react';
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const fetchDataFromDrupal = async (endpoint) => {
    try {
        const response = await axios.get(`${baseURL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data from Drupal:', error);
        throw error;
    }
};

const useDrupalData = (endpoint) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchDataFromDrupal(endpoint);
                setData(result);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return { data, isLoading, error };
};

export default useDrupalData;