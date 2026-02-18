import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import {
  isDummyBackend,
  mockLatency,
  getMockSettlements,
  DEFAULT_MOCK_ORG_ID,
} from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const useDummy = isDummyBackend();

  let orgId: string | null = null;
  if (useDummy) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    orgId = (token?.orgId as string | null) ?? DEFAULT_MOCK_ORG_ID;
    await mockLatency();
  } else {
    const { getServerEnv } = await import("@/lib/env");
    const { NEXTAUTH_SECRET } = getServerEnv();
    const token = await getToken({
      req: request,
      secret: NEXTAUTH_SECRET,
    });
    orgId = token?.orgId as string | null ?? null;
  }

  if (!orgId) {
    return NextResponse.json(
      { error: "Unauthorized or no organization" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10) || 10));
  const status = searchParams.get("status") ?? undefined;

  try {
    if (useDummy) {
      const { data, total } = getMockSettlements(orgId, { page, limit, status });
      const totalPages = Math.ceil(total / limit);
      return NextResponse.json({
        data,
        total,
        page,
        limit,
        totalPages,
      });
    }

    return NextResponse.json(
      { data: [], total: 0, page: 1, limit, totalPages: 0 },
      { status: 200 }
    );
  } catch (e) {
    console.error("Settlements API error:", e);
    return NextResponse.json(
      { error: "Failed to fetch settlements" },
      { status: 500 }
    );
  }
}
