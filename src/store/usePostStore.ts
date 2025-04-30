import { create } from "zustand";
import axios from "axios";

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
    const res = await axios.get<Item[]>("http://localhost:3000/posts");
    set({ items: res.data });
  },

  addPost: async (title, description) => {
    const res = await axios.post<Item>("http://localhost:3000/posts", {
      title,
      description,
    });
    set((state) => ({ items: [...state.items, res.data] }));
  },

  updatePost: async (id, title, description) => {
    const res = await axios.put<Item>(`http://localhost:3000/posts/${id}`, {
      title,
      description,
    });
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? res.data : item)),
    }));
  },

  deletePost: async (id) => {
    await axios.delete(`http://localhost:3000/posts/${id}`);
    set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
  },
}));
