import { NextResponse } from "next/server";
import { createComment } from "~/server/actions/queries";

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const newComment = await createComment(body);
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}
