import { ButtonLink, IssueStatusBadge } from "@/components/blocks"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import React from 'react'

type Sort = "asc" | "desc" | undefined;

export interface IssueQuery {
  filterStatus: Status
  orderBy: keyof Issue,
  sort: Sort,
  page: string
}

interface Props {
  searchParams: IssueQuery,
  issues: Issue[]
}


const IssueTable = ({ searchParams, issues }: Props) => {
  

  const sortControl = (issue: keyof Issue) => {

    if (searchParams.orderBy === issue) {
      return searchParams.sort === 'asc' ? 'desc' : 'asc';
    }
    return 'asc';
  }
  return (
    <Table>
        {/* <TableCaption>A list of recent issues</TableCaption> */}
        <TableHeader>
          <TableRow>
            {columns.map(column => <TableHead key={column.value} className={column.className}>
              <NextLink href={{ 
                query: {
                  // ...searchParams,
                  filterStatus: searchParams.filterStatus,
                  orderBy: column.value,
                  // sort: 'asc'
                  sort: sortControl(column.value)
                }
               }}>
                {column.label}
               </NextLink>
               {column.value === searchParams.orderBy && 
               ( searchParams.sort === 'asc' ? <ArrowUpIcon className="inline"/>: <ArrowDownIcon className="inline"/>)
               }
            </TableHead>)}
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
  )
}

export default IssueTable


const columns: {
    label:string, 
    value: keyof Issue,
    className?: string }[] = [
    {label: 'Issue', value: "title",},
    {label: 'Status', value: 'status', className: 'hidden md:table-cell'},
    {label: 'Created', value: 'createdAt', className: 'hidden md:table-cell'},
  ]

export const columnNames = columns.map(column => column.value);