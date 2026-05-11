import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = jwtDecode(accessToken);

    return NextResponse.json({ user });
  } catch (e) {
    console.error(e);

    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
