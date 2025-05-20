import React from 'react'

interface Props {
  itemCount: number
  pageSize: number
  currentPage: number
}

const Pagination = ({ itemCount, pageSize, currentPage } : Props) => {
  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount <= 1) {
    return null
  }
  return (
    <div className='flex items-center justify-between'>
      <div className='text-sm text-gray-700'>
        Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, itemCount)} of {itemCount} results
      </div>
      <div className='flex items-center'>
        <button disabled={currentPage === 0} className='px-4 py-2 bg-gray-200 rounded-l-md'>Previous</button>
        <button disabled={currentPage >= Math.ceil(itemCount / pageSize) - 1} className='px-4 py-2 bg-gray-200 rounded-r-md'>Next</button>
      </div>
    </div>
  )
}

export default Pagination