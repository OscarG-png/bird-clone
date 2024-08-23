import { useRouter } from "next/navigation";
import { getPostsByTag } from "~/server/actions/queries";

export default async function TagPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const posts = await getPostsByTag(parseInt(id));
  console.log("posts: ", posts);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Tag detail page</h1>
      <h2>Posts with tag {id}</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>{post.content}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
