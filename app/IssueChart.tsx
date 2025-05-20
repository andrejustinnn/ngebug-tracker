'use client'
import { Card } from '@/components/ui/card'
import React from 'react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts'

interface Props {
  open: number,
  inProgress: number,
  done: number,
}

const IssueChart = ({ open, inProgress, done }: Props) => {
  const data = [
    { name: 'Open', value: open },
    { name: 'In Progress', value: inProgress },
    { name: 'Done', value: done },
  ]
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" barSize={60} style={{ 
            fill: 'var(--muted-foreground)'
           }}/>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default IssueChart