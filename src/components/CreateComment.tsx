"use client";
import { useRef, useCallback } from "react";

export default function CreateComment() {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = formRef.current;
      if (!form) return;
      const formData = new FormData(form);
      const response = await fetch("/api/comments", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Comment created successfully");
      } else {
        alert("Error creating comment");
      }
    },
    [],
  );
  return (
    <div>
      <h1>Create a Comment</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="content" placeholder="Comment" />
      </form>
    </div>
  );
}
