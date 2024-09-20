import { NextResponse } from "next/server";
import { SubmitPost } from "~/server/actions/queries";
import { deletePost } from "~/server/actions/queries";

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const newPost = await SubmitPost(body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = Number(url.pathname.split("/").pop());

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }

  try {
    await deletePost(id);
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Error deleting post" }, { status: 500 });
  }
}
