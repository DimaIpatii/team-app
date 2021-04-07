import { useState, useRef } from "react";

const useFetchPosts = (endpoint, options) => {
  const [posts, setPosts] = useState([]);
  const [spiner, setSpiner] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // Errors
  const buffer = useRef({});

  const fetchPosts = async (userId) => {
    if (buffer.current[userId]) {
      setPosts([...buffer.current[userId]]);
      return buffer.current[userId];
    }

    try {
      setSpiner(true);
      const response = await fetch(endpoint + userId, options);
      setSpiner(false);

      if (response.status === 404) throw new Error("not found");

      const data = await response.json();
      if (data.length === 0) throw new Error("no posts");

      buffer.current[userId] = data;
      setPosts(data);
      return data;
    } catch (err) {
      console.error(err.message);

      if (err.message === "no posts" || err.message === "not found") {
        setErrorMsg("This user currently, does not have any post.");
        setPosts([]);
      }
    }
  };

  return [posts, fetchPosts, spiner, errorMsg];
};

export default useFetchPosts;
