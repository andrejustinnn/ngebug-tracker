import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

const DeleteIssueButton = ({issueId} : {issueId:number}) => {
  return (
    <Button className='w-full' variant="outline">
      <TrashIcon />
      <Link href={`/issues/${issueId}/delete`}>
        Delete Issue
      </Link>
    </Button>
  )
}

export default DeleteIssueButton