import PostCard from "~/components/PostCard";
import { getPosts } from "~/server/actions/actions";
import { Separator } from "~/components/ui/separator";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-2">
      <PostCard />
      <Posts />
    </main>
  );
}

async function Posts() {
  const posts = await getPosts();
  return (
    <>
      {posts.map((post) => (
        <>
          <div
            key={post.id}
            className="flex w-72 flex-col items-center rounded border"
          >
            <h1>{post.user}</h1>
            <p>{post.content}</p>
            <p>{post.createdAt.toDateString()}</p>
          </div>
          <Separator className="" />
        </>
      ))}
    </>
  );
}
