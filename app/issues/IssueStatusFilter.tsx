'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Status } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React from 'react'

const statuses: {label: string, value?: Status}[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Done', value: 'DONE' },
]

const IssueStatusFilter = () => {
  const router = useRouter();
  return (
    <Select onValueChange={(status) => {
      const query = status !== 'ALL' ? `?status=${status}` : '';
      router.push('/issues' + query);
    }}>
      <SelectTrigger>
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        {statuses.map(status => <SelectItem key={status.value || 'ALL'} value={status.value || 'ALL'}>{status.label}</SelectItem>)}
        
      </SelectContent>
    </Select>
  )
}

export default IssueStatusFilter