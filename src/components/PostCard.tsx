"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
// import { currentUser } from "@clerk/nextjs/server";

export default function PostCard() {
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    // const currUser = await currentUser();
    // console.log("curruser: ", currUser);

    const formData = new FormData(e.currentTarget);
    // I need to get the user data form clerk later.
    const postData = {
      ...Object.fromEntries(formData.entries()),
      user: "test string",
    };
    console.log("FormData: ", postData);
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
