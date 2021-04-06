import { useState, useRef } from "react";

const useFetchPosts = (endpoint, options) => {
  const [posts, setPosts] = useState([]);
  const [spiner, setSpiner] = useState(false);
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
      if (response.status === 404)
        throw new Error("This user does not have any post.");

      const data = await response.json();
      buffer.current[userId] = data;
      setPosts(data);
      return data;
    } catch (err) {
      // * Error Componenet:
      console.error(err.message);
    }
  };

  return [posts, fetchPosts, spiner];
};

export default useFetchPosts;
