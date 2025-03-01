"use client";

import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { TbBugFilled } from "react-icons/tb";

const Navbar = () => {
  const currentPath = usePathname();
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
              // className={`${
              //   currentPath === link.href ? "text-zinc-900" : "text-zinc-500"
              // } hover:text-zinc-800 transition-colors`}
              className={classnames({
                "text-zinc-900": currentPath === link.href,
                "text-zinc-500": currentPath !== link.href,
                "hover:text-zinc-800 transition-colors": true,
              })}
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
