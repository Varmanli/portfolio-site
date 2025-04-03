import { useState } from "react";
import axios, { AxiosError } from "axios";

/**
 * Custom hook for making a DELETE request using axios.
 * @param url - The URL endpoint to send the delete request to.
 * @returns {Object} - Contains the function to delete data, loading state, and error state.
 */
const useDeleteData = (url: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Sends a DELETE request to the specified URL.
   * @returns {Promise<void>} - Resolves when the delete request is successful.
   */
  const deleteData = async () => {
    try {
      setLoading(true);
      await axios.delete(url); // Make the DELETE request
      return { success: true }; // Indicate successful deletion
    } catch (err) {
      // Check if the error is an AxiosError and extract the message
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || "An unexpected error occurred");
      } else {
        setError("An error occurred while deleting data");
      }
      throw err; // Re-throw error for further handling if needed
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return { deleteData, loading, error };
};

export default useDeleteData;
