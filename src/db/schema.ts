import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, text, varchar } from "drizzle-orm/pg-core";

export const user = pgTable('users', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  likes: many(like),
}));

export const like = pgTable("likes", {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  userId: uuid('userId').references(() => user.id, {onDelete: 'cascade'}).notNull(),
  coinSymbol: varchar("coinSymbol", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const likeRelations = relations(like, ({ one }) => ({
  user: one(user, {
    fields: [like.userId],
    references: [user.id]
  }),
}));