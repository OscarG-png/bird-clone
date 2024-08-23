import PostCard from "~/components/PostCard";
import { getPosts } from "~/server/actions/queries";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Post from "~/components/Post";

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
  // console.log("posts: ", posts[0]!);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}
