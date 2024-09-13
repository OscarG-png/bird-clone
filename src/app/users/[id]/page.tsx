import { getUserPosts } from "~/server/actions/queries";
import Image from "next/image";

export default async function UserPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const posts = await getUserPosts(id);
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1>UserPage</h1>
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col gap-2 rounded-xl border-2 p-5 shadow-md"
          >
            <div id="user" className="flex flex-row items-center gap-6">
              <Image
                src={post.userImage}
                className="rounded-full"
                alt={post.user}
                width={60}
                height={60}
              />
              <h2>{post.user}</h2>
              <p>{post.createdAt.toDateString()}</p>
            </div>
            <div id="body">
              <p>{post.content}</p>
            </div>
            <div id="footer" className="flex flex-row justify-between">
              <div className="flex flex-row gap-1">
                {/* {post.likes.length} */}
                <button>Like</button>
              </div>
              <div className="flex flex-row gap-1">
                <p>0</p>
                <button>Comments</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
