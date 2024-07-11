import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import SubmitPost from "~/server/actions/actions";

export default function PostCard() {
  return (
    <Card className="rounded shadow-md">
      <form action={SubmitPost}>
        <CardHeader>
          <CardTitle>What&apos;s on your mind?</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea className="rounded border p-2" required />
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
          <Button type="submit">Post</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
