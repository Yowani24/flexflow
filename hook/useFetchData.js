import axios from "axios";
import { useMutation, useQuery } from "react-query";

const api_url = "http://localhost:3000";

export default function useFetchData() {
  const { data, isLoading, refetch } = useQuery("projects", async () => {
    return await axios
      .get(`${api_url}/projects`)
      .then((response) => response.data);
  });
  return { data, isLoading, refetch };
}
