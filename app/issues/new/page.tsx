// import IssueForm from '../_components/IssueForm'
// Untuk improve agar simple mde tidak muncul telat maka issue form diimport secara dynamic
// agar halaman muncul stlh simple mde sudah tampil *secara kasarnya sprti itu
"use client";
import dynamic from 'next/dynamic'
import IssueFormSkeleton from '../_components/IssueFormSkeleton';

const IssueForm = dynamic(() => import('../_components/IssueForm'),
  { 
    ssr: false,
    // karena di import secara dynamic, loading page tidak terbaca
    // sehingga kita harus definisikan disini
    loading: () => <IssueFormSkeleton/>
  }
);
const NewIssuePage = () => {
  return (
    <IssueForm/>
  )
}

export default NewIssuePage