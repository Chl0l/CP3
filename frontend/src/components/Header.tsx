import Link from "next/link";

export default function Header() {
  return (
    <header className="header flex flex-col items-center">
      <h1 className="text-[1.8rem] font-bold">Checkpoint : frontend</h1>
      <Link href="/" className="text-[1.2rem] font-semi-bold">
        Countries
      </Link>
    </header>
  );
}
