import "server-only";
import { db } from "~/server/db";
import { type Post } from "~/server/db/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function SubmitPost(
  formData: FormData,
): Promise<{ message: string }> {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  const postData = {
    ...Object.fromEntries(formData.entries()),
    user: user.id,
  };
  console.log("Post submitted!: ", postData);
  //logic to insert post into database here.
  //need to troubleshoot why i'm not seeing the rest of the formdata
  return { message: "Post submitted!" };
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
