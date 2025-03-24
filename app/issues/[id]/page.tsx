import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'

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
    <div className='grid md:grid-cols-5 gap-8 mx-auto'>
      <div className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </div>
      <div>
        <div className="flex flex-col items-center space-y-4">
        <EditIssueButton issueId={issue.id}/>
        <DeleteIssueButton issueId={issue.id}/>
        </div>
      </div>
    </div>
  )
}

export default IssueDetailPage