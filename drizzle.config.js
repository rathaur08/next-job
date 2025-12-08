import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/drizzle/migration",
  schema: "./src/drizzle/schema.js",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
