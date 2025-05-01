import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePostStore, Item } from "@/store/usePostStore";
import { postSchema } from "@/validation/postSchema"; // import the Zod schema

type Props = {
  editItem: Item | null;
  onClearEdit: () => void;
};

export default function PostForm({ editItem, onClearEdit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState<{
    title?: string[];
    description?: string[];
  }>({});
  const addPost = usePostStore((state) => state.addPost);
  const updatePost = usePostStore((state) => state.updatePost);
  const error = usePostStore((state) => state.error);

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
    const result = postSchema.safeParse({ title, description });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setFormErrors(fieldErrors);
      return;
    }

    setFormErrors({});

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
      {formErrors.title && (
        <p className="text-red-500 text-sm">{formErrors.title[0]}</p>
      )}

      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {formErrors.description && (
        <p className="text-red-500 text-sm">{formErrors.description[0]}</p>
      )}

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <Button
        className="cursor-pointer hover:bg-red-500"
        onClick={handleSubmit}>
        {editItem ? "Update" : "Add"}
      </Button>
    </div>
  );
}
