import PostCard from "~/components/PostCard";
import { getPosts } from "~/server/actions/actions";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
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
        <div key={post.id} className="flex flex-col items-center">
          <h1>{post.user}</h1>
          <p>{post.content}</p>
          <p>{post.createdAt.toDateString()}</p>
        </div>
      ))}
    </>
  );
}
