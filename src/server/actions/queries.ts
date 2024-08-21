import "server-only";
import { db } from "~/server/db";
import { hashTags, postHashTags, posts, type Post } from "~/server/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";

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

  const newPost = await db
    .insert(posts)
    .values(postData)
    .returning({ insertedPost: posts.id });

  if (formTags) {
    const tags = formTags.split(",").map((tag) => tag.trim());
    const tagData = tags.map((tag) => ({
      tag,
      postId: newPost[0]!.insertedPost,
    }));
    const newTag = await db
      .insert(hashTags)
      .values(tagData)
      .returning({ insertedTag: hashTags.id });
    await db.insert(postHashTags).values({
      postId: newPost[0]!.insertedPost,
      tagId: newTag[0]!.insertedTag,
    });
  }

  console.log("Post submitted!: ", newPost);
  return { message: "Post submitted!" };
}

export async function getPosts(): Promise<Post[]> {
  const posts = await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
    with: {
      postTags: {
        with: {
          tag: true,
        },
      },
    },
  });
  return posts.map((post) => ({
    ...post,
    postTags: post.postTags.map((postTag) => ({
      id: postTag.tagId,
      tag: postTag.tag.tag,
    })),
  }));
}

export async function getPostById(id: number): Promise<Post> {
  const post = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
    with: {
      postTags: {
        with: {
          tag: true,
        },
      },
    },
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
export async function deletePost(id: number): Promise<{ message: string }> {
  const post = await db.delete(posts).where(eq(posts.id, id)).returning();
  console.log("Post deleted: ", post);
  if (!post) {
    throw new Error("Post not found");
  }
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  // if (post.user !== user.username) {
  //   throw new Error("You are not authorized to delete this post");
  // }
  // await db.query.posts.delete({
  //   where: (model, { eq }) => eq(model.id, id),
  // });
  return { message: "Post deleted" };
}
export interface TagCount {
  id: number;
  tag: string;
  count: number;
}
export default async function getTags(): Promise<TagCount[]> {
  const tags = await db
    .select({
      id: hashTags.id,
      tag: hashTags.tag,
      count: sql`COUNT(${hashTags.tag})`.as<number>("count"),
    })
    .from(hashTags)
    .groupBy(hashTags.id);
  return tags;
}
