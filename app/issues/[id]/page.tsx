import IssueStatusBadge from '@/components/blocks/IssueStatusBadge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Flex from '@/components/ui/flex'
import { Heading, Text } from '@/components/ui/typography'
import { prisma } from '@/prisma/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'

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

  // await delay(2000);

  return (
    <div className='grid grid-cols-2 gap-2 mx-auto'>
      <div>
        <Heading variant="h3">{issue.title}</Heading>
        <Flex gap={2} my={2}>
          <IssueStatusBadge status={issue.status} />
          <Text>
            {issue.createdAt.toDateString()}
          </Text>
        </Flex>
        <Card className='prose mt-4'>
          <CardContent>
            <ReactMarkdown>
              {issue.description}
            </ReactMarkdown>
          </CardContent>
        </Card>
      </div>
      <div>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>
            Edit
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default IssueDetailPage