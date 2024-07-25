import "server-only";
import { db } from "~/server/db";
import { type Post } from "~/server/db/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function SubmitPost(formData: FormData): Promise<void> {
  const user = await currentUser();
  const postData = {
    ...Object.fromEntries(formData.entries()),
    user: user!.id,
  };
  console.log("Post submitted!: ", postData);
}
export async function getPosts(): Promise<Post[]> {
  const posts = await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return posts;
}

export async function getPostById(id: number): Promise<Post> {
  const post = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
}
export async function getUserPosts(userId: string) {
  const posts = await db.query.posts.findMany({
    where: (model, { eq }) => eq(model.user, userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return posts;
}
