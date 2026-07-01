import { NextRequest, NextResponse } from "next/server";
import { getClientIp, isTrackablePath, recordPageView } from "@/lib/analytics";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const path = (body as { path?: unknown } | null)?.path;

    if (!isTrackablePath(path)) {
      return NextResponse.json({ success: true });
    }

    await recordPageView({
      path,
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
      ip: getClientIp(request.headers),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
