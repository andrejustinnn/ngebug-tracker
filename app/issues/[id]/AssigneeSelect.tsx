'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Skeleton from '@/components/blocks/Skeleton';
import { User } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


const AssigneeSelect = () => {
  const {data: users, error, isLoading} = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res=>res.data),
    staleTime: 60*1000, // 60s
    retry:3, // means 1 + 3 additional request will be sent if begining request failed.
  });

  if(isLoading) return <Skeleton width="10rem" />

  if(error) {
    return null;
  }

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Assign to.." />
      </SelectTrigger>
      <SelectContent>
        {users?.map(user => <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>)}
      </SelectContent>
    </Select>

  )
}

export default AssigneeSelect