import type { UserRole } from "@prisma/client";

export type { UserRole };

export interface SessionUser {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  role: UserRole;
  orgId: string | null;
}
