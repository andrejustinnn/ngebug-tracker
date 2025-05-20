import { prisma } from "@/prisma/client";
// import delay from "delay";
import Pagination from "@/components/blocks/Pagination";
import { Status } from "@prisma/client";
import IssueAction from "./IssueAction";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next";
// import { dynamic } from 'next/dynamic';

interface Props {
  searchParams: IssueQuery,
}

const IssuesPage = async ({
  searchParams
}: Props) => {

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.filterStatus) ? searchParams.filterStatus : undefined; // undefined agar prisma tidak anggap filtering ini

  // // valid orderby
  const isValidOrderBy = columnNames.includes(searchParams.orderBy);
  const orderBy = isValidOrderBy ? {
    [searchParams.orderBy]: searchParams.sort === 'asc' ? 'asc' : 'desc'
  } : undefined;
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;
  const where = {
    status
  }
  const issues = await prisma.issue.findMany({
    where:where,
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalCount = await prisma.issue.count({
    where: where
  });
  
  // await delay(2000);
  return (
    <div className="space-y-6">
      <IssueAction />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={totalCount}
      />
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

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all issues',
  keywords: 'issue tracker, issue list',
}
