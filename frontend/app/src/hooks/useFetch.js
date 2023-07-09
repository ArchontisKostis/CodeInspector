import { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                const res = await fetch(url, options);
                const data = await res.json();
                setResponse(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { isLoading, error, response };
};

export default useFetch;
