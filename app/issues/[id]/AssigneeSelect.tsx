import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const AssigneeSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Assign to.." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Andre Justin</SelectItem>
        <SelectItem value="2">Cynthia</SelectItem>
      </SelectContent>
    </Select>

  )
}

export default AssigneeSelect