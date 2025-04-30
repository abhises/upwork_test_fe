import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Item = {
  id: number;
  title: string;
  description: string;
};

export default function CrudTable() {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddOrUpdate = () => {
    if (editId !== null) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, title, description } : item
        )
      );
      setEditId(null);
    } else {
      setItems((prev) => [...prev, { id: Date.now(), title, description }]);
    }
    setTitle("");
    setDescription("");
  };

  const handleEdit = (item: Item) => {
    setEditId(item.id);
    setTitle(item.title);
    setDescription(item.description);
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">CRUD - Title & Description</h1>

      <div className="space-y-2">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleAddOrUpdate}>
          {editId !== null ? "Update" : "Add"}
        </Button>
      </div>

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
                <Button onClick={() => handleEdit(item)} size="sm">
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(item.id)}
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
