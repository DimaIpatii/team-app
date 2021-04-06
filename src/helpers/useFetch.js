import { useEffect, useState } from "react";

const useFetch = (endpoint, options) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [spiner, setSpine] = useState(false);

  const fetchData = async (endpoint, options = {}) => {
    setSpine(true);
    try {
      const response = await fetch(endpoint, options);
      if (response.status === 404) throw new Error("");
      setSpine(false);
      const data = await response.json();
      return data;
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchData(endpoint).then((data) => setData(data));
  }, [endpoint]);

  return [data, error, spiner];
};

export default useFetch;
