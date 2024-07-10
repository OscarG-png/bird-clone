import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
export default function PostCard() {
  return (
    <Card className="w-40  rounded">
      <CardHeader>
        <CardTitle>Post Title</CardTitle>
        <CardDescription>Post Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Post Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
