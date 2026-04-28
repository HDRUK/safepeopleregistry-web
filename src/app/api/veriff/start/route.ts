import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, vendorData } = body;

  const apiKey = process.env.IDVT_SUPPLIER_API_KEY!;
  const baseUrl = process.env.IDVT_SUPPLIER_BASE_URL!;
  const endpoint = `${baseUrl}/v1/sessions`;

  const payload = {
    verification: {
      person: {
        firstName,
        lastName,
      },
      vendorData,
      timestamp: new Date().toISOString(),
      callback: "",
    },
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-client": apiKey,
      "x-origin": "custom-sdk",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Veriff session failed" },
      { status: 500 }
    );
  }

  const json = await res.json();
  return NextResponse.json({ url: json.verification.url });
}
