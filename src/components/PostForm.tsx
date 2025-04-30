import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePostStore, Item } from "@/store/usePostStore";

type Props = {
  editItem: Item | null;
  onClearEdit: () => void;
};

export default function PostForm({ editItem, onClearEdit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addPost = usePostStore((state) => state.addPost);
  const updatePost = usePostStore((state) => state.updatePost);

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
      setDescription(editItem.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editItem]);

  const handleSubmit = () => {
    if (editItem) {
      updatePost(editItem.id, title, description);
      onClearEdit();
    } else {
      addPost(title, description);
    }
    setTitle("");
    setDescription("");
  };

  return (
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
      <Button onClick={handleSubmit}>{editItem ? "Update" : "Add"}</Button>
    </div>
  );
}
