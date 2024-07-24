import PostCard from "~/components/PostCard";
import { getPosts } from "~/server/actions/actions";
import { Separator } from "~/components/ui/separator";
import { auth, currentUser } from "@clerk/nextjs/server";

export default function HomePage() {
  const user = auth();
  console.log("user: ", user);

  return (
    <main className="flex min-h-screen flex-col items-center gap-2">
      <PostCard />
      <Posts />
    </main>
  );
}

async function Posts() {
  const posts = await getPosts();
  const curruser = await currentUser();
  console.log("curruser: ", curruser);
  // this version gives me access to things like username and user image url
  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <div className="flex w-72 flex-col items-center rounded border p-2 shadow-md">
            <div className="flex w-full justify-between">
              <h1>{post.user}</h1>
              <p className="text-sm italic">{post.createdAt.toDateString()}</p>
            </div>
            <p>{post.content}</p>
          </div>
          <Separator className="" />
        </div>
      ))}
    </>
  );
}
