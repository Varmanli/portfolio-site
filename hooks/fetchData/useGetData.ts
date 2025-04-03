import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

/**
 * Custom hook for making a GET request using axios.
 * @param url - The URL endpoint to send the request to.
 * @returns {Object} - Contains the data, loading state, and error state.
 */
const useGetData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches data from the specified URL using a GET request.
   */
  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setData(response.data); // Set the data received from the server
    } catch (err) {
      // Check if the error is an AxiosError and extract the message
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "An unexpected error occurred");
      } else {
        setError("An error occurred while fetching data");
      }
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    getData();
  }, [url]); // The effect will run when the URL changes

  return { data, loading, error, getData }; // Return the state and the function to trigger the request
};

export default useGetData;
