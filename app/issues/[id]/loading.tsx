import { Card, CardContent } from '@/components/ui/card'
import Flex from '@/components/ui/flex'
import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetailPage = () => {
  return (
    <div className='max-w-xl'>
      <Skeleton />
      <Flex gap={2} my={2}>
        <Skeleton width="5rem" />
        <Skeleton width="8rem"/>
      </Flex>
      <Card className='prose mt-4'>
      <CardContent>
        <Skeleton count={5} />
      </CardContent>
      </Card>
    </div>
  )
}

export default LoadingIssueDetailPage