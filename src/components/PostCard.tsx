"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { SubmitPost } from "~/server/actions/actions";

export default function PostCard() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await SubmitPost(formData);
  }
  return (
    <Card className="rounded shadow-md">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>What&apos;s on your mind?</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea className="rounded border p-2" required />
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
