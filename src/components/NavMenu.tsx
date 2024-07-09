import { ModeToggle } from "./Theme-Toggle";

export default function NavMenu() {
  return (
    <nav className="flex justify-around">
      <ul className="flex flex-row gap-2">
        <li>Home</li>
        <li>Profile</li>
      </ul>
      <ModeToggle />
    </nav>
  );
}
