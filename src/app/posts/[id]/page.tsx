import { getPostById } from "~/server/actions/queries";
import { MessageCircleReply } from "lucide-react";
import Image from "next/image";
import { type Comment } from "~/server/db/schema";
import CreateComment from "~/components/CreateComment";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await getPostById(parseInt(id));
  const { comments } = post;
  console.log("from post detail page: ", post);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <h1>PostPage</h1>
        <div className="rounded-xl border-2 p-5 shadow-md">
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
              {post.likes.length}
              <button>Like</button>
            </div>
            <div className="flex flex-row gap-1">
              <p>0</p>
              <button>
                <MessageCircleReply />
              </button>
            </div>
          </div>
        </div>
        <CreateComment postId={id} />
      </div>
      <CommentsList comments={comments} />
    </>
  );
}

function CommentsList({ comments }: { comments: Comment[] }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {comments.map((comment) => (
        <div key={comment.id} className="rounded-xl border-2 p-5 shadow-md">
          <p>From: {comment.user}</p>
          <p>{comment.content}</p>
          <p>Posted on: {comment.createdAt.toDateString()}</p>
        </div>
      ))}
    </div>
  );
}
