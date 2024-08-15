import PostCard from "~/components/PostCard";
import { getPosts } from "~/server/actions/queries";
import { Separator } from "~/components/ui/separator";
import Image from "next/image";

export default function HomePage() {
  // const user = auth();
  // console.log("user: ", user);

  return (
    <main className="flex min-h-screen flex-col items-center gap-2">
      <PostCard />
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
            <div className="flex w-full justify-between">
              <div className="flex flex-row">
                <Image
                  src={`${post.userImage}`}
                  alt="user image"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <h1>{post.user}</h1>
              </div>
              <p className="text-sm italic">{post.createdAt.toDateString()}</p>
            </div>
            <p>{post.content}</p>
            <div className="flex flex-row gap-2">
              {post.tags.map((tag) => (
                <span key={tag.id} className="text-sm italic">
                  {tag.tag}
                </span>
              ))}
            </div>
          </div>
          <Separator className="" />
        </div>
      ))}
    </>
  );
}
