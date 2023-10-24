import React from 'react';

type Props = {
  tableData: any;
  cardData: any;
  sortByName: boolean;
  sortedByCreatedAt: boolean;
  sortTable: (type: string) => void;
};

const Records = ({
  tableData,
  cardData,
  sortByName,
  sortedByCreatedAt,
  sortTable,
}: Props) => {
  const sortingIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
    >
      <path d='M8,5.70710678 L8,19.508331 C8,19.7844734 7.77614237,20.008331 7.5,20.008331 C7.22385763,20.008331 7,19.7844734 7,19.508331 L7,5.70710678 L4.85355339,7.85355339 C4.65829124,8.04881554 4.34170876,8.04881554 4.14644661,7.85355339 C3.95118446,7.65829124 3.95118446,7.34170876 4.14644661,7.14644661 L7.14644661,4.14644661 C7.34170876,3.95118446 7.65829124,3.95118446 7.85355339,4.14644661 L10.8535534,7.14644661 C11.0488155,7.34170876 11.0488155,7.65829124 10.8535534,7.85355339 C10.6582912,8.04881554 10.3417088,8.04881554 10.1464466,7.85355339 L8,5.70710678 Z M12.5,6 C12.2238576,6 12,5.77614237 12,5.5 C12,5.22385763 12.2238576,5 12.5,5 L20.5,5 C20.7761424,5 21,5.22385763 21,5.5 C21,5.77614237 20.7761424,6 20.5,6 L12.5,6 Z M12.5,10 C12.2238576,10 12,9.77614237 12,9.5 C12,9.22385763 12.2238576,9 12.5,9 L18.5,9 C18.7761424,9 19,9.22385763 19,9.5 C19,9.77614237 18.7761424,10 18.5,10 L12.5,10 Z M12.5,14 C12.2238576,14 12,13.7761424 12,13.5 C12,13.2238576 12.2238576,13 12.5,13 L16.5,13 C16.7761424,13 17,13.2238576 17,13.5 C17,13.7761424 16.7761424,14 16.5,14 L12.5,14 Z M12.5,18 C12.2238576,18 12,17.7761424 12,17.5 C12,17.2238576 12.2238576,17 12.5,17 L14.5,17 C14.7761424,17 15,17.2238576 15,17.5 C15,17.7761424 14.7761424,18 14.5,18 L12.5,18 Z' />
    </svg>
  );

  return (
    <div className='mb-3 bg-transparent'>
      <table className='text-md mb-4 hidden w-auto rounded bg-white shadow-md xl:block'>
        <tbody>
          <tr className='border-b '>
            <th className=' p-3 px-5 text-left'>
              First Name{' '}
              <button
                className={`${sortByName && 'rotate-180'}`}
                onClick={() => sortTable('firstName')}
              >
                {sortingIcon}
              </button>
            </th>
            <th className=' p-3 px-5 text-left'>
              Last Name{' '}
              {/* <button
                className={`${sortByName && 'rotate-180'}`}
                onClick={() => sortTable('firstName')}
              >
                {sortingIcon}
              </button> */}
            </th>
            <th className=' p-3 px-5 text-left'>
              Email{' '}
              {/* <button onClick={() => sortTable('email')}>{sortingIcon}</button> */}
            </th>
            <th className=' p-3 px-5 text-left'>
              Phone{' '}
              {/* <button onClick={() => sortTable('phone')}>{sortingIcon}</button> */}
            </th>
            <th className=' p-3 px-5 text-left'>
              Created{' '}
              <button
                className={`${sortedByCreatedAt && 'rotate-180'}`}
                onClick={() => sortTable('date')}
              >
                {sortingIcon}
              </button>
            </th>
            <th className=' p-3 px-5 text-left'>Picture</th>
            <th className=' p-3 px-5 text-left'>Edit</th>
          </tr>
          {tableData}
        </tbody>
      </table>
      <div className='flex flex-col gap-10 bg-transparent sm:flex xl:hidden'>
        {cardData}
      </div>
    </div>
  );
};

export default Records;