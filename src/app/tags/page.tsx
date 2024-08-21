import getTags from "~/server/actions/queries";
import Link from "next/link";

export default async function TagPage() {
  const tags = await getTags();
  return (
    <div className="flex justify-center gap-2">
      {tags.map((tag) => (
        <Link key={tag.tag} href={`/tags/${tag.id}`}>
          <div className="flex flex-row gap-1 rounded bg-slate-200 p-1 text-sm italic hover:bg-blue-400 hover:underline dark:bg-slate-500">
            <h1>{tag.tag}</h1>
            <p>{tag.count}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
