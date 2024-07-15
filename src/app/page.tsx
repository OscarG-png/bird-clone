import PostCard from "~/components/PostCard";
import { getPosts } from "~/server/actions/actions";

export default function HomePage() {
  const posts = getPosts();
  console.log("Posts: ", posts);
  return (
    <main className="flex min-h-screen flex-col items-center">
      <PostCard />
    </main>
  );
}
