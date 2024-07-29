import "server-only";
import { db } from "~/server/db";
import { posts, type Post } from "~/server/db/schema";
import { currentUser, clerkClient } from "@clerk/nextjs/server";

export async function SubmitPost(
  formData: FormData,
): Promise<{ message: string }> {
  const user = await currentUser();
  // console.log("user data: ", user);
  if (!user) {
    throw new Error("User not found");
  }
  const formContent = formData.get("content");
  if (typeof formContent !== "string") {
    throw new Error("Content not found");
  }
  const postData = {
    user: user.id,
    content: formContent,
  };
  const newPost = await db.insert(posts).values(postData);
  console.log("Post submitted!: ", newPost);
  return { message: "Post submitted!" };
}
export async function getPosts(): Promise<Post[]> {
  const posts = await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  // I should make my own backend. I don't know what'll happen if this gets too big.
  // lots of calls to the clerk api maybe be bad.
  for (const post of posts) {
    const userName = await clerkClient.users.getUser(post.user);
    post.user = userName.username!;
  }

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
