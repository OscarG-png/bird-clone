import Post from "~/components/Post";
import { getPostsByTag } from "~/server/actions/queries";

export default async function TagPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const posts = await getPostsByTag(parseInt(id));

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Tag detail page</h1>
      <h2>Posts with tag {id}</h2>
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
