import "server-only";
import { db } from "~/server/db";
import { hashTags, posts, type Post } from "~/server/db/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function SubmitPost(
  formData: FormData,
): Promise<{ message: string }> {
  const user = await currentUser();
  // console.log("user data: ", user);
  if (!user) {
    throw new Error("User not found");
  }
  if (user.banned) {
    throw new Error("User is banned");
  }
  const formContent = formData.get("content") as string;
  const formTags = formData.get("tags") as string;

  const postData = {
    user: user.username!,
    userImage: user.imageUrl,
    content: formContent,
  };

  const newPost = await db.insert(posts).values(postData).returning();

  if (formTags) {
    const tags = formTags.split(",").map((tag) => tag.trim());
    const tagData = tags.map((tag) => ({
      tag,
      postId: newPost[0]!.id,
    }));
    await db.insert(hashTags).values(tagData);
  }

  console.log("Post submitted!: ", newPost);
  return { message: "Post submitted!" };
}

export async function getPosts(): Promise<Post[]> {
  const posts = await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
    with: {
      tags: true,
    },
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
export async function deletePost(id: number) {
  const post = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!post) {
    throw new Error("Post not found");
  }
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  if (post.user !== user.username) {
    throw new Error("You are not authorized to delete this post");
  }
  // await db.query.posts.delete({
  //   where: (model, { eq }) => eq(model.id, id),
  // });
  return { message: "Post deleted" };
}
