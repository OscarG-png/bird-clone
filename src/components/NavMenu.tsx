import { ModeToggle } from "./Theme-Toggle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function NavMenu() {
  return (
    <nav className="mt-2 flex justify-between gap-2">
      <ul className="flex gap-4">
        <li>Home</li>
        <li>Profile</li>
      </ul>
      <div className="relative flex gap-2">
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
