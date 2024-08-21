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
  return (
    <div className="flex flex-row gap-1">
      <Link href={`/posts/${postId}`}>0</Link>
      <Heart fill={liked ? "#dc2626" : "none"} />
    </div>
  );
}
