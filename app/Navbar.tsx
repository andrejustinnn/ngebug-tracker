import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbBugFilled } from "react-icons/tb";

const Navbar = () => {
  const links = [
    {
      href: "/",
      label: "Dashboard",
    },
    {
      href: "/issues",
      label: "Issues",
    },
  ];
  return (
    <nav className="flex items-center space-x-6 py-4 px-6 mb-6 border-b border-zinc-200">
      <Link href="/" className="flex items-center space-x-1">
        <TbBugFilled size={20} />
      </Link>
      <ul className="flex items-center space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
