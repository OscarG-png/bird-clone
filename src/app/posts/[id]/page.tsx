import { getPostById } from "~/server/actions/queries";
import Image from "next/image";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await getPostById(parseInt(id));
  console.log(post);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>PostPage</h1>
      <div>
        <div id="user" className="flex flex-row items-center gap-2">
          <Image
            src={post.userImage}
            className="rounded-full"
            alt={post.user}
            width={50}
            height={50}
          />
          <h2>{post.user}</h2>
          <p>{post.createdAt.toDateString()}</p>
        </div>
        <div id="body">
          <p>{post.content}</p>
        </div>
        <div id="footer">
          <button>Like</button>
          <button>Comment</button>
        </div>
      </div>
    </div>
  );
}
