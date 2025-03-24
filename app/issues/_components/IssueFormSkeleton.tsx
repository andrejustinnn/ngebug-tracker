import React from 'react'
import { Skeleton } from '@/components/blocks';

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </div>
  )
}

export default IssueFormSkeleton