import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Status } from '@prisma/client'
import React from 'react'

const statuses: {label: string, value?: Status}[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Done', value: 'DONE' },
]

const IssueStatusFilter = () => {
  return (
    <Select>
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