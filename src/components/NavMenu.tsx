import { ModeToggle } from "./Theme-Toggle";

export default function NavMenu() {
  return (
    <nav className="mt-2 flex justify-between gap-2">
      <ul className="flex gap-4">
        <li>Home</li>
        <li>Profile</li>
      </ul>
      <div className="relative">
        <ModeToggle />
      </div>
    </nav>
  );
}
