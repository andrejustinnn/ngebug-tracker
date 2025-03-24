"use client"
import { Issue } from '@prisma/client';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './IssueFormSkeleton';

const IssueForm = dynamic(() => import('./IssueForm'),
  { 
    ssr: false,
    loading: () => <IssueFormSkeleton/>
  }
);

const IssueFormWrapper = ({issue} : {issue?:Issue}) => {
  return (
    <IssueForm issue={issue}/>
  )
}

export default IssueFormWrapper