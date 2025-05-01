import { create } from "zustand";
import axios from "axios";

// Access the API URL from the environment variable
const API_URL = import.meta.env.VITE_API_URL;

export type Item = {
  id: number;
  title: string;
  description: string;
};

interface ErrorResponse {
  error: string;
  details?: Array<{ code: string; message: string }>;
}

type PostState = {
  items: Item[];
  error: string | null; // Error state
  fetchPosts: () => Promise<void>;
  addPost: (title: string, description: string) => Promise<void>;
  updatePost: (id: number, title: string, description: string) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  setError: (error: string) => void; // Function to set error
};

export const usePostStore = create<PostState>((set) => ({
  items: [],
  error: null, // Initialize error state
  fetchPosts: async () => {
    try {
      const res = await axios.get<Item[]>(`${API_URL}/posts`);
      set({ items: res.data });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const axiosError = error.response.data as ErrorResponse;
        set({ error: axiosError.error || "An error occurred" });
      } else {
        set({ error: "An unexpected error occurred" });
      }
    }
  },

  addPost: async (title, description) => {
    try {
      const res = await axios.post<Item>(`${API_URL}/posts`, {
        title,
        description,
      });
      set((state) => ({ items: [...state.items, res.data] }));
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const axiosError = error.response.data as ErrorResponse;
        set({ error: axiosError.error || "An error occurred" });
      } else {
        set({ error: "An unexpected error occurred" });
      }
    }
  },

  updatePost: async (id, title, description) => {
    try {
      const res = await axios.put<Item>(`${API_URL}/posts/${id}`, {
        title,
        description,
      });
      set((state) => ({
        items: state.items.map((item) => (item.id === id ? res.data : item)),
      }));
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const axiosError = error.response.data as ErrorResponse;
        set({ error: axiosError.error || "An error occurred" });
      } else {
        set({ error: "An unexpected error occurred" });
      }
    }
  },

  deletePost: async (id) => {
    try {
      await axios.delete(`${API_URL}/posts/${id}`);
      set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const axiosError = error.response.data as ErrorResponse;
        set({ error: axiosError.error || "An error occurred" });
      } else {
        set({ error: "An unexpected error occurred" });
      }
    }
  },

  setError: (error) => set({ error }), // Set error
}));
