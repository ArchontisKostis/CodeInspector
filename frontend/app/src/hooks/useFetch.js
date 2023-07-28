import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      if (!url) return; // Return early if no URL is provided

      setIsLoading(true);

      try {
            const res = await fetch(url, {
                  headers: {
                    "Content-Type": "application/json",
                  },
            });

            if (!res.ok) {
                const errorResponse = await res.json();
                console.log(errorResponse.detail)
                throw new Error(errorResponse.detail);
            }

            const json = await res.json();
            if (mounted) {
                setResponse(json);
            }
      } catch (err) {
            console.log(err)
            setError(err);
      }

      setIsLoading(false);
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [url]);

  return { response, isLoading, error };
};

export default useFetch;
