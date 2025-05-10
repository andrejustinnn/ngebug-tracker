'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Skeleton} from '@/components/blocks';
import { Issue, User } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import toast, {Toaster} from 'react-hot-toast'


const AssigneeSelect = ({ issue }: {issue: Issue}) => {
  const {data: users, error, isLoading} = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res=>res.data),
    staleTime: 60*1000, // 60s
    retry:3, // means 1 + 3 additional request will be sent if begining request failed.
  });

  const handleValueChange = async (userId: string) => {
    try{
      await axios.patch(`/api/issues/${issue.id}`,{
        assignedToUserId: userId === 'Unassigned' ? null : userId
      })
    }catch{
      toast.error('Changes could not be saved.')
    }
  }

  if(isLoading) return <Skeleton />

  if(error) {
    return null;
  }

  return (
    <>
    
    <Select onValueChange={(userId) => handleValueChange(userId)}
      defaultValue={issue.assignedToUserId || 'Unassigned'}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Assign to.." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Unassigned">Unassigned</SelectItem>
        {users?.map(user => <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>)}
      </SelectContent>
    </Select>
    <Toaster />
    </>

  )
}

export default AssigneeSelect