import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export default function PostCard() {
  return (
    <Card className="rounded shadow-md">
      <CardHeader>
        <CardTitle>What&apos;s on your mind?</CardTitle>
      </CardHeader>
      <CardContent>
        <textarea className="rounded border p-2" />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
        <Button>Post</Button>
      </CardFooter>
    </Card>
  );
}
