/**
 * Validated environment config. Use this instead of process.env for required vars.
 * Validates at module load in server/runtime; client-safe for public vars only.
 */

const required = (key: string): string => {
  const value = process.env[key];
  if (value == null || value === "") {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const optional = (key: string): string | undefined => {
  const value = process.env[key];
  return value === "" ? undefined : value;
};

/** Server-only: required for DB and auth */
export function getServerEnv() {
  return {
    DATABASE_URL: required("DATABASE_URL"),
    NEXTAUTH_SECRET: required("NEXTAUTH_SECRET"),
    NEXTAUTH_URL: optional("NEXTAUTH_URL") ?? "http://localhost:3000",
  };
}

/** Public env (safe to expose to client). Prefix with NEXT_PUBLIC_ in .env */
export function getPublicEnv() {
  return {
    NEXT_PUBLIC_APP_URL: optional("NEXT_PUBLIC_APP_URL") ?? optional("NEXTAUTH_URL") ?? "http://localhost:3000",
  };
}

