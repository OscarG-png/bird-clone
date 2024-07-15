import "server-only";
import { db } from "~/server/db";

export async function SubmitPost(): Promise<string> {
  console.log("Post submitted!");
  return "success";
}
export async function getPosts() {
  const posts = await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  if (!posts) {
    throw new Error("No posts found");
  }
  return posts;
}

export async function getPostById(id: number) {
  const post = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
}
