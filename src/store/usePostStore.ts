import { create } from "zustand";
import axios from "axios";

// Access the API URL from the environment variable
const API_URL = import.meta.env.VITE_API_URL;

export type Item = {
  id: number;
  title: string;
  description: string;
};

type PostState = {
  items: Item[];
  fetchPosts: () => Promise<void>;
  addPost: (title: string, description: string) => Promise<void>;
  updatePost: (id: number, title: string, description: string) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
};

export const usePostStore = create<PostState>((set) => ({
  items: [],

  fetchPosts: async () => {
    const res = await axios.get<Item[]>(`${API_URL}/posts`); // Use the environment variable
    set({ items: res.data });
  },

  addPost: async (title, description) => {
    const res = await axios.post<Item>(`${API_URL}/posts`, {
      title,
      description,
    });
    set((state) => ({ items: [...state.items, res.data] }));
  },

  updatePost: async (id, title, description) => {
    const res = await axios.put<Item>(`${API_URL}/posts/${id}`, {
      title,
      description,
    });
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? res.data : item)),
    }));
  },

  deletePost: async (id) => {
    await axios.delete(`${API_URL}/posts/${id}`);
    set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
  },
}));
