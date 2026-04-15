import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (process.env.GOOGLE_SHEET_URL) {
      try {
        await fetch(process.env.GOOGLE_SHEET_URL, {
          method: "POST",
          body: JSON.stringify({
            type: "contact",
            name,
            email,
            company,
            phone,
            service,
            message,
          }),
        });
      } catch {
        // Don't block the response if sheets fails
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
