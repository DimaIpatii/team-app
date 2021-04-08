import { useEffect, useState } from "react";

/* Types */
import { IUsersResponse } from "../types";

type fetchedData = [IUsersResponse[], string, boolean];

const useFetch = (
  endpoint: string,
  options?: { [any: string]: any }
): fetchedData => {
  const [data, setData] = useState<IUsersResponse[]>([]);
  const [usersErrorMsg, setUsersErrorMsg] = useState<string>("");
  const [spiner, setSpine] = useState<boolean>(false);

  const fetchData = async (endpoint: string): Promise<void> => {
    setSpine(true);
    try {
      const response = await fetch(endpoint, options);

      if (response.status === 404) throw new Error("no users");
      setSpine(false);
      const data: IUsersResponse[] = await response.json();
      setData(data);
    } catch (err) {
      if (err.message === "no users") {
        setUsersErrorMsg("Cannot find users...");
      }
    }
  };

  useEffect(() => {
    fetchData(endpoint).catch((err) => {
      console.log(err.message);
    });
  }, [endpoint]); // eslint-disable-line

  return [data, usersErrorMsg, spiner];
};

export default useFetch;
