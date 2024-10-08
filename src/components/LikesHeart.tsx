"use client";
import { Heart } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
export default function LikesHeart({
  postId,
  liked,
}: {
  postId: number;
  liked: boolean;
}) {
  async function handleLike(postId: number) {
    const formData = new FormData();
    formData.append("postId", postId.toString());
    const res = await fetch("/api/likes", {
      method: "POST",
      body: formData,
    });
    if (res.status === 201) {
      console.log("Like created");
    } else {
      console.error("Error creating like");
    }
  }
  return (
    <>
      <SignedIn>
        <Heart
          onClick={() => handleLike(postId)}
          fill={liked ? "#dc2626" : "none"}
          className="hover:cursor-pointer"
        />
      </SignedIn>
      <SignedOut>
        <Heart
          onClick={() => alert("Please sign in to like")}
          fill={liked ? "#dc2626" : "none"}
          className="hover:cursor-pointer"
        />
      </SignedOut>
    </>
  );
}
