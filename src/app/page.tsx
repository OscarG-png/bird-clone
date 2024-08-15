import PostCard from "~/components/PostCard";
import { getPosts } from "~/server/actions/queries";
import { Separator } from "~/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Heart, MessageCircle } from "lucide-react";

export default function HomePage() {
  // const user = auth();
  // console.log("user: ", user);

  return (
    <main className="flex min-h-screen flex-col items-center gap-2">
      <SignedIn>
        <PostCard />
      </SignedIn>
      <SignedOut>
        <h1>Please sign in to create posts</h1>
        <SignInButton />
      </SignedOut>
      <Posts />
    </main>
  );
}

async function Posts() {
  const posts = await getPosts();
  console.log("posts: ", posts[0]!.tags);
  return (
    <>
      {posts.map((post) => (
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
              {post.tags.map((tag) => (
                <span key={tag.id} className="text-sm italic">
                  {tag.tag}
                </span>
              ))}
            </div>
            <div className="flex flex-row gap-5">
              <div className="flex flex-row gap-1">
                0
                <Heart />
              </div>
              <div className="flex flex-row gap-1">
                0
                <MessageCircle />
              </div>
            </div>
          </div>
          <Separator className="" />
        </div>
      ))}
    </>
  );
}
