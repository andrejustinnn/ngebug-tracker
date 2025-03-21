import { ButtonLink, IssueStatusBadge } from "@/components/blocks"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/prisma/client";
// import delay from "delay";
import IssueAction from "./IssueAction";
// import { dynamic } from 'next/dynamic';

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  // await delay(2000);
  return (
    <div className="space-y-6">
      <IssueAction />
      <Table>
        <TableCaption>A list of recent issues</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium flex md:block justify-between items-center">
                <ButtonLink href={`/issues/${issue.id}`}>{issue.title}</ButtonLink>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// page ini static rendering by defaut
// yg by default dynamic rendering page yang ada paramnya

// caranya untuk buat page ini menjadi dynamic rendering
export const dynamic = 'force-dynamic'; // tp ini dari sisi server side, kadang dari sisi client blm berubah karena dri sisi client ada cachingnya juga
export const revalidate = 0; // revalidate setiap 0 detik, tp sm ky force-dynamic 

// untuk client caching, static route akan revalidate stlh 5 menit, dynamic route akan revalidate stlh 30 detik


export default IssuesPage;
