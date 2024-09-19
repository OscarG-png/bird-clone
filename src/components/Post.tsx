import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import LikesHeart from "./LikesHeart";
import Link from "next/link";
import Image from "next/image";
import type { PostWithTagsLikesAndComments } from "~/server/db/schema";

export default function Post({ post }: { post: PostWithTagsLikesAndComments }) {
  // console.log("post: ", post);
  return (
    <div key={post.id}>
      <div className="flex w-72 flex-col items-center rounded border p-2 shadow-md">
        <div className="flex w-full">
          <div className="flex flex-row items-center gap-1">
            <Image
              src={`${post.userImage}`}
              alt="user image"
              width={50}
              height={50}
              className="rounded-full"
            />
            <h1 className="hover:text-blue-500 hover:underline">
              <Link href={`/users/${post.user}`}>{post.user}</Link>
            </h1>
          </div>
          <p className="text-sm italic">{post.createdAt.toDateString()}</p>
        </div>
        <p>{post.content}</p>
        <div className="flex flex-row gap-2">
          <p>Tagged with: </p>
          {post.postTags.map((tag) => (
            <span
              key={tag.id}
              className="rounded bg-slate-200 p-1 text-sm italic hover:bg-blue-400 hover:underline dark:bg-slate-500"
            >
              <Link href={`/tags/${tag.id}`}>{tag.tag}</Link>
            </span>
          ))}
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex flex-row gap-1">
            <Link href={`/posts/${post.id}`}>
              <p>{post.likes.length}</p>
            </Link>
            <LikesHeart postId={post.id} liked={false} />
          </div>
          <Link href={`/posts/${post.id}`}>
            <div className="flex flex-row gap-1">
              {post.comments.length}
              <MessageCircle />
            </div>
          </Link>
        </div>
        <Button className="rounded bg-red-600">delete</Button>
      </div>
    </div>
  );
}
