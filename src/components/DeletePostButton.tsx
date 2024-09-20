"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { deletePost } from "~/server/actions/queries";

export function DeletePostButton({ postId }: { postId: number }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      setIsDeleteModalOpen(false);
      router.push("/"); // Redirect to home page after deletion
      router.refresh(); // Refresh the page to update the posts list
    } catch (error) {
      console.error("Error deleting post:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
        Delete Post
      </Button>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this post?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
