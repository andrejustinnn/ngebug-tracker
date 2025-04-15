"use client";

import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { TbBugFilled } from "react-icons/tb";

const Navbar = () => {
  
  return (
    <nav className="py-4 px-6 mb-6 border-b border-zinc-200">
      <div className="flex items-center justify-between container mx-auto ">
        <div className="flex items-center space-x-6">
          <Link href="/" className="space-x-1">
            <TbBugFilled size={20} />
          </Link>
          <NavLinks />
        </div>
        <AuthStatus />
      </div>
    </nav>
  );
};

const NavLinks = () => {
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
  return <ul className="flex items-center space-x-6">
    {links.map((link) => (
      <li key={link.href}>
        <Link
          href={link.href}
          // className={`${
          //   currentPath === link.href ? "text-zinc-900" : "text-zinc-500"
          // } hover:text-zinc-800 transition-colors`}
          className={classnames({
            'nav-link': true,
            "!text-zinc-900": currentPath === link.href, // ! gunanya menjadi important
            // "text-zinc-500": currentPath !== link.href,
            // "hover:text-zinc-800 transition-colors": true,
          })}
        >
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Skeleton from "@/components/blocks/Skeleton";
const AuthStatus = () => {
  const { status, data:session } = useSession();

  if (status === "loading") {
    return <Skeleton width="3rem" />;
  }

  if (status === "unauthenticated") {
    return <Link
        href="/api/auth/signin"
        className="nav-link"
      >
        Sign in
      </Link>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="border-2 border-zinc-200 hover:border-zinc-300 transition-colors cursor-pointer">
          <AvatarImage src={session!.user!.image!} 
            // referrerPolicy='no-referrer' untuk menghilangkan error saat fetch image ke google
          />
          <AvatarFallback>
            {session!.user!.name!.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {session!.user!.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href="/api/auth/signout"
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            Sign out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Navbar;
