import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { Client } from "pg";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Missing DIRECT_URL or DATABASE_URL environment variable.");
  process.exit(1);
}

const schemaPath = path.resolve(process.cwd(), "supabase-schema.sql");
const schemaSql = await fs.readFile(schemaPath, "utf8");

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  await client.query(schemaSql);

  const { rows } = await client.query(`
    select table_name
    from information_schema.tables
    where table_schema = 'public'
      and table_name in (
        'profiles',
        'lesson_progress',
        'track_progress',
        'study_sessions',
        'reflections',
        'app_settings'
      )
    order by table_name;
  `);

  console.log(`Schema applied. Verified ${rows.length} public tables:`);
  for (const row of rows) {
    console.log(`- ${row.table_name}`);
  }
} catch (error) {
  console.error("Failed to apply schema:");
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
