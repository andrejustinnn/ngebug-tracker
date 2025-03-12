import IssueStatusBadge from '@/components/blocks/IssueStatusBadge'
import { Card } from '@/components/ui/card'
import Flex from '@/components/ui/flex'
import { Heading, Text } from '@/components/ui/typography'
import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
  params: {
    id: string
  }
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id)
    }
  })

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading variant="h3">{issue.title}</Heading>
      <Flex gap={2} my={2}>
        <IssueStatusBadge status={issue.status} />
        <Text>
          {issue.createdAt.toDateString()}
        </Text>
      </Flex>
      <Card>

        <Text>
          {issue.description}
        </Text>
      </Card>

    </div>
  )
}

export default IssueDetailPage