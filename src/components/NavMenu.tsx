import { ModeToggle } from "./Theme-Toggle";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function NavMenu() {
  return (
    <nav className="container mt-2 grid grid-cols-2 justify-between gap-2">
      <ul className="flex gap-4">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>Profile</li>
      </ul>
      <div className="flex justify-end gap-2">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle />
      </div>
    </nav>
  );
}
