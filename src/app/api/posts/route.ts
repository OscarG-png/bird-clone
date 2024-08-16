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
export async function DEL(request: Request) {
  const id = Number(request.url.split("/")[2]);
  try {
    await deletePost(id);
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting post" }, { status: 500 });
  }
}
