import { mysqlTable, text, varchar, int, timestamp, boolean } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Example table - customize for your app
export const items = mysqlTable("items", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`(UUID())`),
  name: text("name").notNull(),
  description: text("description"),
  position: int("position").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// Types
export type Item = typeof items.$inferSelect;
export type InsertItem = typeof items.$inferInsert;
