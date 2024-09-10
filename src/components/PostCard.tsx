"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { useRef, useCallback } from "react";

export default function PostCard() {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = formRef.current;
      if (!form) return;
      const formData = new FormData(form);
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        form.reset();
      } else {
        console.error("Failed to submit post");
      }
    },
    [],
  );
  return (
    <Card className="rounded shadow-md">
      <form ref={formRef} onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>What&apos;s on your mind?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-center gap-5">
          <textarea name="content" className="rounded border p-2" required />
          <label htmlFor="tags" className="flex flex-col gap-1">
            Tags:
            <input
              id="tags"
              type="text"
              name="tags"
              placeholder="Seperate tags with Commas"
              className="rounded border p-2"
            />
          </label>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between gap-2">
            <p>Card Footer</p>
            <Button type="submit" className="rounded border bg-blue-400">
              Post
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
