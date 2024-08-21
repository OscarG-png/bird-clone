"use cleint";
import { Heart } from "lucide-react";
import Link from "next/link";

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
    <div className="flex flex-row gap-1">
      <Link href={`/posts/${postId}`}>0</Link>
      <Heart
        onClick={() => handleLike(postId)}
        fill={liked ? "#dc2626" : "none"}
      />
    </div>
  );
}
