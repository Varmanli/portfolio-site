import {
  ApiResponse,
  ApiError,
  ServiceItem,
  PortfolioItem,
  ContactInfo,
} from "@/types/pageContent";

/**
 * API configuration
 * TODO: Move to environment variables
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

/**
 * Generic API request function
 * @template T - Expected response type
 * @param {string} endpoint - API endpoint
 * @param {RequestInit} [options] - Request options
 * @returns {Promise<ApiResponse<T>>} API response
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

/**
 * Service-related API functions
 */
export const servicesApi = {
  /**
   * Fetch all services
   * @returns {Promise<ApiResponse<ServiceItem[]>>} List of services
   */
  getAll: () => apiRequest<ServiceItem[]>("/services"),

  /**
   * Fetch service by ID
   * @param {string} id - Service ID
   * @returns {Promise<ApiResponse<ServiceItem>>} Service details
   */
  getById: (id: string) => apiRequest<ServiceItem>(`/services/${id}`),
};

/**
 * Portfolio-related API functions
 */
export const portfolioApi = {
  /**
   * Fetch all portfolio items
   * @returns {Promise<ApiResponse<PortfolioItem[]>>} List of portfolio items
   */
  getAll: () => apiRequest<PortfolioItem[]>("/portfolio"),

  /**
   * Fetch portfolio item by ID
   * @param {string} id - Portfolio item ID
   * @returns {Promise<ApiResponse<PortfolioItem>>} Portfolio item details
   */
  getById: (id: string) => apiRequest<PortfolioItem>(`/portfolio/${id}`),
};

/**
 * Contact-related API functions
 */
export const contactApi = {
  /**
   * Fetch all contact information
   * @returns {Promise<ApiResponse<ContactInfo[]>>} List of contact methods
   */
  getAll: () => apiRequest<ContactInfo[]>("/contact"),

  /**
   * Submit contact form
   * @param {Record<string, string>} data - Form data
   * @returns {Promise<ApiResponse<void>>} Submission result
   */
  submitForm: (data: Record<string, string>) =>
    apiRequest<void>("/contact/submit", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
