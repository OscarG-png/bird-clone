// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql, type InferSelectModel } from "drizzle-orm";
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
    user: varchar("name", { length: 100 }).notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    content: varchar("content", { length: 256 }).notNull(),
  },
  (example) => ({
    nameIndex: index("user_idx").on(example.user),
  }),
);
export type Post = InferSelectModel<typeof posts>;

export const likes = createTable(
  "like",
  {
    id: serial("id").primaryKey(),
    user: varchar("user", { length: 100 }).notNull(),
    postId: integer("post_id")
      .references(() => posts.id, { onDelete: "cascade" })
      .notNull(),
  },
  (example) => ({
    nameIndex: index("user_idx").on(example.user),
  }),
);
export type Like = InferSelectModel<typeof likes>;
