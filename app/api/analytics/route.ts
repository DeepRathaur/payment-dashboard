import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import {
  isDummyBackend,
  mockLatency,
  getMockAnalytics,
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

  try {
    if (useDummy) {
      const data = getMockAnalytics(orgId);
      return NextResponse.json(data);
    }

    return NextResponse.json(
      {
        totalVolume: 0,
        transactionCount: 0,
        successRate: 0,
        volumeByDay: [],
        countByStatus: {},
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Analytics API error:", e);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
