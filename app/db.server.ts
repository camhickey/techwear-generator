import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || ''; // Set a default value if DATABASE_URL is undefined
const sql = neon(databaseUrl);

export { sql };
