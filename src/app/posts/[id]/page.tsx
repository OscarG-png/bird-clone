import { getPostById } from "~/server/actions/queries";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await getPostById(parseInt(id));
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>PostPage</h1>
      <h1>{post.content}</h1>
    </div>
  );
}
