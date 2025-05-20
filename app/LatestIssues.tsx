import { ButtonLink, IssueStatusBadge } from '@/components/blocks'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Flex from '@/components/ui/flex'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { prisma } from '@/prisma/client'

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 5,
    include: {
      assignedToUser: true // ini untuk ambil issue yang ada assignedToUserId // teknik ini disebut eager loading yaitu ambil data yang ada relasinya
    }
  })
  return (
    <Card className='w-full'>
      <CardHeader>Latest Issues</CardHeader>
      <CardContent>

        <Table>
          <TableBody>
            {issues.map(issue => (
              <TableRow key={issue.id}>
                <TableCell>
                  <div className='flex justify-between items-center'>
                    
                    <div className='flex flex-col items-start mb-2'>
                      <ButtonLink href={`/issues/${issue.id}`}>{issue.title}</ButtonLink>
                      <IssueStatusBadge status={issue.status} />
                    </div>
                    {/* Avatar here */}
                    {issue.assignedToUser && 
                      <Avatar className="border-2 border-zinc-200 hover:border-zinc-300 transition-colors cursor-pointer">
                        <AvatarImage src={issue.assignedToUser.image!} 
                          // referrerPolicy='no-referrer' untuk menghilangkan error saat fetch image ke google
                        />
                        <AvatarFallback>
                          {issue.assignedToUser.name!.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    }
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default LatestIssues