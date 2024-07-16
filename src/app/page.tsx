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
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h2>{post.user}</h2>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  );
}
