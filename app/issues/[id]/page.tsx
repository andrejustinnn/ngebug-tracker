import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

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
        <IssueDetails issue={issue} />
      </div>
      <div>
        <EditIssueButton issueId={issue.id}/>
      </div>
    </div>
  )
}

export default IssueDetailPage