import { NextResponse } from "next/server";
import { createLike } from "~/server/actions/queries";

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const newLike = await createLike(body);
    return NextResponse.json(newLike, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}
