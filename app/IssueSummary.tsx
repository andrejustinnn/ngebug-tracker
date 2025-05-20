import { ButtonLink } from '@/components/blocks';
import { Card, CardContent } from '@/components/ui/card';
import { Status } from '@prisma/client';
import React from 'react'

interface Props {
  open: number,
  inProgress: number,
  done: number,
}

const IssueSummary = ({ open, inProgress, done }: Props) => {
  const containers: {
    label: string,
    value: number,
    status: Status
  }[] = [
    { label: 'Open', value: open, status: Status.OPEN },
    { label: 'In Progress', value: inProgress, status: Status.IN_PROGRESS },
    { label: 'Done', value: done, status: Status.DONE },
  ];
  return (
    <div className="flex gap-4">
      {containers.map(container => (
        <Card key={container.status}>
          <CardContent>
            <div className="flex gap-1 items-start">
              <div className="text-2xl font-bold text-zinc-800">{container.value}</div>
              <ButtonLink href={`/issues?filterStatus=${container.status}`}>
                <div className="text-sm text-zinc-500 ml-1">{container.label}</div>
              </ButtonLink>
            </div>
            
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default IssueSummary