'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Status } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const statuses: {label: string, value?: Status}[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Done', value: 'DONE' },
]

const IssueStatusFilter = () => {
  const router = useRouter();
  // filter bug replacing query string
  const searchParams = useSearchParams();
  return (
    <Select onValueChange={(status) => {
      const params = new URLSearchParams();
      if (status !== 'ALL') params.append('filterStatus', status);
      if (searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!);
      if (searchParams.get('sort')) params.append('sort', searchParams.get('sort')!);
      const query = params.size ? `?${params.toString()}` : '';
      router.push('/issues' + query);
    }}
      defaultValue={searchParams.get('filterStatus') || 'ALL'}>
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