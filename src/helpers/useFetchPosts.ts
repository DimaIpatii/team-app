import { useState, useRef } from "react";

/* Types */
import { IPostsResponse, IBuffer, PostsReturn } from "../types";

const useFetchPosts = (
  endpoint: string,
  options?: { [any: string]: any }
): PostsReturn => {
  const [posts, setPosts] = useState<IPostsResponse[]>([]);
  const [spiner, setSpiner] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Errors
  const buffer: IBuffer = useRef({});

  const fetchPosts = async (userId: number): Promise<void> => {
    if (buffer.current[userId]) {
      setPosts([...buffer.current[userId]]);
    } else {
      try {
        setSpiner(true);
        const response = await fetch(endpoint + userId, options);
        setSpiner(false);

        if (response.status === 404) throw new Error("not found");

        const data = await response.json();
        if (data.length === 0) throw new Error("no posts");

        buffer.current[userId] = data;
        setPosts(data);
      } catch (err) {
        console.error(err.message);

        if (err.message === "no posts" || err.message === "not found") {
          setErrorMsg("This user currently, does not have any post.");
          setPosts([]);
        }
      }
    }
  };

  return [posts, fetchPosts, spiner, errorMsg];
};

export default useFetchPosts;
