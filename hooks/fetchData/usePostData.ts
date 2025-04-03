import { useState } from "react";
import axios, { AxiosError } from "axios";

/**
 * Custom hook for making a POST request using axios.
 * @param url - The URL endpoint to send the request to.
 * @returns {Object} - Contains the function to post data, loading state, and error state.
 */
const usePostData = <Input, Output>(url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Sends data to the specified URL using a POST request.
   * @param data - The data to be sent in the body of the POST request.
   * @returns {Promise<Output>} - The response data from the server.
   */
  const postData = async (data: Input): Promise<Output> => {
    try {
      setLoading(true);
      const response = await axios.post<Output>(url, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "An unexpected error occurred");
      } else {
        setError("An error occurred during the request");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error };
};

export default usePostData;
