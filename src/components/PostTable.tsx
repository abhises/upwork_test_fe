import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePostStore, Item } from "@/store/usePostStore";
import PostForm from "./PostForm";

export default function PostTable() {
  const { items, fetchPosts, deletePost } = usePostStore();
  const [editItem, setEditItem] = useState<Item | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">CRUD - Title & Description</h1>
      <PostForm editItem={editItem} onClearEdit={() => setEditItem(null)} />

      <table className="w-full border mt-4">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Title</th>
            <th className="text-left p-2">Description</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-2">{item.title}</td>
              <td className="p-2">{item.description}</td>
              <td className="p-2 space-x-2">
                <Button
                  className="cursor-pointer"
                  onClick={() => setEditItem(item)}
                  size="sm">
                  Edit
                </Button>
                <Button
                  className="cursor-pointer"
                  onClick={() => deletePost(item.id)}
                  variant="destructive"
                  size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
