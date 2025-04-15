import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link';
import { useSession } from 'next-auth/react';


const ProfileDropdown = () => {
  const {status, data: session} = useSession();
  console.log("Session", session);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="border-2 border-zinc-200 hover:border-zinc-300 transition-colors cursor-pointer">
          <AvatarImage src={session?.user?.image ?? undefined} 
            // referrerPolicy='no-referrer' untuk menghilangkan error saat fetch image ke google
          />
          <AvatarFallback>
            {session?.user?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {status === "authenticated" && 
          <>
            <DropdownMenuLabel>
              {session?.user?.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        }
        
        {status === "authenticated" && (
          <DropdownMenuItem>
            <Link
              href="/api/auth/signout"
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
            >
              Sign out
            </Link>
          </DropdownMenuItem>
        )}
        {status === "unauthenticated" && (
          <DropdownMenuItem>
            <Link
              href="/api/auth/signin"
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
            >
              Sign in
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown