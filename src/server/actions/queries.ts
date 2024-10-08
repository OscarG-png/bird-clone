import "server-only";
import { db } from "~/server/db";
import {
  hashTags,
  likes,
  postHashTags,
  posts,
  comments,
  type PostWithTags,
  type PostWithTagsLikesAndComments,
  type Comment,
} from "~/server/db/schema";
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
    const tagIds: number[] = [];

    for (const tag of tags) {
      const existingTag = await db
        .select({ id: hashTags.id })
        .from(hashTags)
        .where(eq(hashTags.tag, tag))
        .limit(1)
        .execute();

      let tagId: number;

      if (existingTag.length > 0) {
        tagId = existingTag[0]!.id;
      } else {
        const newTag = await db
          .insert(hashTags)
          .values({ tag })
          .returning({ id: hashTags.id });
        tagId = newTag[0]!.id;
      }
      tagIds.push(tagId);
    }
    await Promise.all(
      tagIds.map((tagId) =>
        db.insert(postHashTags).values({
          postId: newPost[0]!.insertedPost,
          tagId,
        }),
      ),
    );
  }
  console.log("Post submitted!: ", newPost);
  return { message: "Post submitted!" };
}

export async function getPosts(): Promise<PostWithTagsLikesAndComments[]> {
  const posts = await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
    with: {
      postTags: {
        with: {
          tag: true,
        },
      },
      likes: true,
      comments: true,
    },
  });
  return posts.map((post) => ({
    ...post,
    postTags: post.postTags.map((postTag) => ({
      id: postTag.tagId,
      tag: postTag.tag.tag,
    })),
    likes: post.likes || [],
    comments: post.comments || [],
  }));
}

export async function getPostById(
  id: number,
): Promise<PostWithTagsLikesAndComments> {
  const post = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
    with: {
      postTags: {
        with: {
          tag: true,
        },
      },
      likes: true,
      comments: true,
    },
  });
  if (!post) {
    throw new Error("Post not found");
  }
  return {
    ...post,
    postTags: post.postTags.map((postTag) => ({
      id: postTag.tagId,
      tag: postTag.tag.tag,
    })),
    likes: post.likes || [],
    comments: post.comments || [],
  };
}

export async function getUserPosts(userId: string) {
  const posts = await db.query.posts.findMany({
    where: (model, { eq }) => eq(model.user, userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return posts;
}
export async function deletePost(id: number): Promise<{ message: string }> {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  const post = await db.query.posts.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.user !== user.username) {
    throw new Error("You are not authorized to delete this post");
  }

  await db.delete(posts).where(eq(posts.id, id));

  console.log("Post deleted: ", post);
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

export async function getPostsByTag(id: number): Promise<PostWithTags[]> {
  const rawPosts = await db
    .select({
      post: posts,
      postHashTags: postHashTags,
      tag: hashTags.tag,
    })
    .from(posts)
    .innerJoin(postHashTags, eq(posts.id, postHashTags.postId))
    .innerJoin(hashTags, eq(postHashTags.tagId, hashTags.id))
    .where(eq(postHashTags.tagId, id));

  const formattedPosts = rawPosts.map((post) => ({
    id: post.post.id,
    user: post.post.user,
    userImage: post.post.userImage,
    createdAt: post.post.createdAt,
    content: post.post.content,
    postTags: [
      {
        id: post.postHashTags.tagId,
        tag: post.tag,
      },
    ],
  }));
  return formattedPosts;
}

export async function createLike(
  formData: FormData,
): Promise<{ message: string }> {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  if (user.banned) {
    throw new Error("User is banned");
  }
  const formContent = formData.get("postId") as string;
  const likeData = {
    user: user.username!,
    postId: parseInt(formContent),
  };
  await db.insert(likes).values(likeData);
  return { message: "Like created" };
}

export async function getLikes(id: number) {
  const likes = await db.query.likes.findMany({
    where: (model, { eq }) => eq(model.postId, id),
  });
  return likes;
}

export async function createComment(
  formData: FormData,
): Promise<{ message: string }> {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  if (user.banned) {
    throw new Error("User is banned");
  }
  const formContent = formData.get("content") as string;
  const postId = parseInt(formData.get("postId") as string);
  const commentData = {
    user: user.username!,
    postId: postId,
    content: formContent,
    createdAt: new Date(),
  };
  await db.insert(comments).values(commentData);
  return { message: "Comment created" };
}

export async function getCommentsByUser(userId: string): Promise<Comment[]> {
  const comments = await db.query.comments.findMany({
    where: (model, { eq }) => eq(model.user, userId),
  });
  return comments;
}
