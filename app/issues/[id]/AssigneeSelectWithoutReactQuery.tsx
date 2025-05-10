'use client'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { User } from '@prisma/client';
import axios from 'axios';


const AssigneeSelect = () => {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const {data} = await axios.get<User[]>('/api/users');
      setUsers(data);
    }

    fetchUsers();
  }, []);

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Assign to.." />
      </SelectTrigger>
      <SelectContent>
        {users.map(user => <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>)}
      </SelectContent>
    </Select>

  )
}

export default AssigneeSelect