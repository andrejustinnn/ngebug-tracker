import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const AssigneeSelect = () => {

  //  ini client component dan gabisa akses prisma di client component
  // prisma hanya ada di server component maka harus pake use effect untuk ambil data dari server component
  
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Assign to.." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Andre Justin</SelectItem>
      </SelectContent>
    </Select>

  )
}

export default AssigneeSelect