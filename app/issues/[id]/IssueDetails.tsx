import { IssueStatusBadge } from '@/components/blocks'
import { Card, CardContent } from '@/components/ui/card'
import Flex from '@/components/ui/flex'
import { Heading, Text } from '@/components/ui/typography'
import { Issue } from '@prisma/client'
import ReactMarkdown from 'react-markdown'

interface Props {
  issue: Issue
}

const IssueDetails = ({issue}: Props) => {
  return (
    <>
    <Heading variant="h3">{issue.title}</Heading>
        <Flex gap={2} my={2}>
          <IssueStatusBadge status={issue.status} />
          <Text>
            {issue.createdAt.toDateString()}
          </Text>
        </Flex>
        <Card className='prose max-w-full mt-4'>
          <CardContent>
            <ReactMarkdown>
              {issue.description}
            </ReactMarkdown>
          </CardContent>
        </Card>
    </>
  )
}

export default IssueDetails