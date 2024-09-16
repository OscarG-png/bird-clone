"use client";
import { useRef, useCallback } from "react";

export default function CreateComment({ postId }: { postId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = formRef.current;
      if (!form) return;
      const formData = new FormData(form);
      formData.append("postId", postId);
      const response = await fetch("/api/comments", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Comment created successfully");
      } else {
        alert("Error creating comment");
      }
    },
    [postId],
  );
  return (
    <div className="rounded border-2 p-5 shadow-sm">
      <h1>Write a Reply</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="content"
          placeholder="Comment"
          className="rounded p-2 focus:border-cyan-400"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
