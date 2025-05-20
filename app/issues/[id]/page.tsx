import { Button } from '@/components/ui/button'
import { prisma } from '@/prisma/client'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { notFound } from 'next/navigation'
import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'

interface Props {
  params: {
    id: string
  }
}


// berat klo harus fetch dua kali untuk metadata dan untuk render

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({
    where: {
      id: issueId
    }
  }))

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession();

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) {
    notFound();
  }

  // await delay(2000);

  return (
    <div className='grid md:grid-cols-5 gap-8 mx-auto'>
      <div className='md:col-span-4 space-y-4'>
        <Button variant="outline">
          <Link href="/issues">
            <ArrowLeftIcon />
          </Link>
        </Button>
        <IssueDetails issue={issue} />
      </div>
      {session && <div>
        <div className="flex flex-col items-center space-y-4">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id}/>
          <DeleteIssueButton issueId={issue.id}/>
        </div>
      </div>}
    </div>
  )
}

export default IssueDetailPage


export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  if (!issue) {
    return {
      title: 'Issue not found',
      description: 'The issue you are looking for does not exist',
    }
  }

  return {
    title: `Issue ${issue.title}`,
    description: `Details of issue ${issue.title}`,
  }
}