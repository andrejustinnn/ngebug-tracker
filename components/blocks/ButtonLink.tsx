import { Button } from "@/components/ui/button"
import Link from "next/link"
 
export default function ButtonLink({href, children}: {href: string, children: React.ReactNode}) {
  return <Button className="p-0" variant="link">
    <Link href={href}>{children}</Link>
  </Button>
}