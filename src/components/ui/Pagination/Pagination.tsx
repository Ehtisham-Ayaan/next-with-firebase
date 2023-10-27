import Link from 'next/link';
import React from 'react';

type Props = {
  nPages: number;
  currentPage: number;
  indexOfFirstRecord: number;
  indexOfLastRecord: number;
  totalRecords: number;
  setCurrentPage: (no: number) => void;
};

const Pagination = ({
  nPages,
  currentPage,
  setCurrentPage,
  indexOfLastRecord,
  indexOfFirstRecord,
  totalRecords,
}: Props) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const ChevronIcon = (): React.ReactNode => (
    <svg
      fill='#000000'
      height='15px'
      width='15px'
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 330 330'
      xmlSpace='preserve'
    >
      <path
        id='XMLID_92_'
        d='M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001
  l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996
  C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z'
      />
    </svg>
  );
  return (
    <>
      <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
        <div className='flex flex-1 justify-between sm:hidden'>
          <Link
            href='#'
            onClick={goToPrevPage}
            className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
          >
            Previous
          </Link>
          <Link
            href='#'
            onClick={goToNextPage}
            className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
          >
            Next
          </Link>
        </div>
        <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm text-gray-700'>
              Showing{' '}
              <span className='font-medium'>{indexOfFirstRecord + 1}</span> to{' '}
              <span className='font-medium'>
                {indexOfLastRecord > totalRecords
                  ? totalRecords
                  : indexOfLastRecord}
              </span>{' '}
              of <span className='font-medium'>{totalRecords}</span> results
            </p>
          </div>
          <div>
            <nav
              className='isolate inline-flex -space-x-px rounded-md shadow-sm'
              aria-label='Pagination'
            >
              <Link
                href='#'
                className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                onClick={goToPrevPage}
              >
                <span className='sr-only'>Previous</span>
                <ChevronIcon aria-hidden='true' />
              </Link>
              {pageNumbers.map((pgNumber) => (
                <Link
                  key={pgNumber}
                  onClick={() => setCurrentPage(pgNumber)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                    currentPage == pgNumber
                      ? 'z-10 bg-emerald-800 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                  }`}
                  href='#'
                >
                  {pgNumber}
                </Link>
              ))}
              <Link
                href='#'
                className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                onClick={goToNextPage}
              >
                <span className='sr-only'>Next</span>
                <div className='rotate-180'>
                  <ChevronIcon aria-hidden='true' />
                </div>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
