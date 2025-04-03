import { useState } from "react";
import axios, { AxiosError } from "axios";

/**
 * Custom hook for making an UPDATE request (PUT/PATCH) using axios.
 * @param url - The URL endpoint to send the update request to.
 * @returns {Object} - Contains the function to update data, loading state, and error state.
 */
const useUpdateData = <T>(url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Sends an update (PUT/PATCH) request to the specified URL.
   * @param data - The data to be updated.
   * @returns {Promise<T>} - The updated data from the server.
   */
  const updateData = async (data: T): Promise<T> => {
    try {
      setLoading(true);
      const response = await axios.patch(url, data); // Use PUT for update (you can switch to PATCH)
      return response.data; // Return the updated data
    } catch (err) {
      // Check if the error is an AxiosError and extract the message
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "An unexpected error occurred");
      } else {
        setError("An error occurred while updating data");
      }
      throw err; // Re-throw error for further handling if needed
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return { updateData, loading, error };
};

export default useUpdateData;
