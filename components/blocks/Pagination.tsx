'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
  itemCount: number
  pageSize: number
  currentPage: number
}

const Pagination = ({ itemCount, pageSize, currentPage } : Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount <= 1) {
    return null
  }

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());

    router.push('/issues?' + params.toString());
  }
  return (
    <div className='flex items-center justify-between'>
      <div className='text-sm text-gray-700'>
        Page {currentPage} of {pageCount}
      </div>
      <div className='flex items-center'>
        <button onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage === 1} className='px-4 py-2 bg-gray-200 rounded-l-md'>Previous</button>
        <button onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage >= pageCount} className='px-4 py-2 bg-gray-200 rounded-r-md'>Next</button>
      </div>
    </div>
  )
}

export default Pagination