// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql, relations, type InferSelectModel } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `bird-clone_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    user: varchar("user", { length: 100 }).notNull(),
    userImage: varchar("user_image", { length: 200 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    content: varchar("content", { length: 256 }).notNull(),
  },
  (example) => ({
    nameIndex: index("post_user_idx").on(example.user),
  }),
);
export type Post = InferSelectModel<typeof posts>;
export type PostWithTags = Post & { postTags: { id: number; tag: string }[] };
export type PostWithTagsAndLikes = PostWithTags & { likes: number };
export const postRelations = relations(posts, ({ many }) => ({
  postTags: many(postHashTags),
  likes: many(likes),
}));

export const likes = createTable(
  "like",
  {
    id: serial("id").primaryKey(),
    user: varchar("user", { length: 100 }).notNull(),
    postId: integer("post_id")
      .references(() => posts.id, { onDelete: "cascade" })
      .notNull()
      .unique(),
  },
  (example) => ({
    nameIndex: index("like_user_idx").on(example.user),
  }),
);
export type Like = InferSelectModel<typeof likes>;
export const likeRelations = relations(likes, ({ one }) => ({
  likes: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
}));

export const comments = createTable(
  "comment",
  {
    id: serial("id").primaryKey(),
    user: varchar("user", { length: 100 }).notNull(),
    postId: integer("post_id")
      .references(() => posts.id, { onDelete: "cascade" })
      .notNull(),
    content: varchar("content", { length: 256 }).notNull(),
  },
  (example) => ({
    nameIndex: index("comment_user_idx").on(example.user),
  }),
);
export type Comment = InferSelectModel<typeof comments>;

export const hashTags = createTable(
  "hash_tag",
  {
    id: serial("id").primaryKey(),
    tag: varchar("tag", { length: 100 }).notNull().unique(),
  },
  (example) => ({
    nameIndex: index("tag_user_idx").on(example.tag),
  }),
);
export type HashTag = InferSelectModel<typeof hashTags>;

export const postHashTags = createTable("post_hash_tag", {
  id: serial("id").primaryKey(),
  postId: integer("post_id")
    .references(() => posts.id, { onDelete: "cascade" })
    .notNull(),
  tagId: integer("tag_id")
    .references(() => hashTags.id, { onDelete: "cascade" })
    .notNull(),
});
export const postHashTagRelations = relations(postHashTags, ({ one }) => ({
  post: one(posts, {
    fields: [postHashTags.postId],
    references: [posts.id],
  }),
  tag: one(hashTags, {
    fields: [postHashTags.tagId],
    references: [hashTags.id],
  }),
}));
