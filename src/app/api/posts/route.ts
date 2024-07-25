import { NextResponse } from "next/server";
import { SubmitPost } from "~/server/actions/queries";

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const newPost = await SubmitPost(body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}
