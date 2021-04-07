import { useEffect, useState } from "react";

const useFetch = (endpoint, options = {}) => {
  const [data, setData] = useState([]);
  const [usersErrorMsg, setUsersErrorMsg] = useState("");
  const [spiner, setSpine] = useState(false);

  const fetchData = async (endpoint) => {
    setSpine(true);
    try {
      const response = await fetch(endpoint, options);

      if (response.status === 404) throw new Error("no users");
      setSpine(false);
      const data = await response.json();
      return data;
    } catch (err) {
      if (err.message === "no users") {
        setUsersErrorMsg("Cannot find users...");
      }
    }
  };

  useEffect(() => {
    fetchData(endpoint).then((data) => setData(data));
  }, [endpoint]); // eslint-disable-line

  return [data, usersErrorMsg, spiner];
};

export default useFetch;
