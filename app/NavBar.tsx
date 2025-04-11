import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa";

interface Link {
  label: string;
  href: string;
}

const NavBar = () => {
  const links: Link[] = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-6 ">
        {links.map((link) => {
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-zinc-500 hover:text-zinc-800 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
