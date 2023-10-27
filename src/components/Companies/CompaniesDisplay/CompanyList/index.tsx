import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EditIcon from '@/images/edit.svg';
import SortingIcon from '@/images/sortingIcon.svg';

type Props = {
  filteredCompanies: any;
  sortByName: any;
  sortTable: any;
  sortedByCreatedAt: any;
  editCompany: (string: string) => void;
};

const CompanyList = async ({
  filteredCompanies,
  sortByName,
  sortTable,
  sortedByCreatedAt,
  editCompany,
}: Props) => {
  const list = filteredCompanies.map((company: any, index: any) => (
    <tr
      key={company.id}
      className={`border-b hover:bg-orange-100 ${
        index % 2 === 0 ? 'bg-gray-100' : ''
      }`}
    >
      <td className='w-[18%] p-3 px-5'>
        <span
          title={company.name}
          className='line-clamp-1 text-xs hover:text-clip lg:text-sm'
        >
          {company.name}
        </span>
      </td>

      <td className='p-3 px-5 text-xs lg:text-sm'>{company.phone}</td>

      <td className='w-[18%] p-3 px-5'>
        <span
          title={company.address}
          className='line-clamp-1 text-xs hover:text-clip lg:text-sm'
        >
          {company.address}
        </span>
      </td>

      <td className='w-[18%] p-3 px-5'>
        <span
          title={company.date.substring(0, 24)}
          className='line-clamp-1 text-xs hover:text-clip lg:text-sm'
        >
          {company.date.substring(0, 24)}
        </span>
      </td>

      <td className='gap-5 p-3 px-5'>
        <Link
          href={{
            pathname: '/dashboard/companies/form',
            query: { company: JSON.stringify(company) },
          }}
          onClick={() => editCompany(company)}
        >
          <Image
            className='hover:cursor-pointer'
            onClick={() => editCompany(company)}
            src={EditIcon}
            alt='edit'
            width='20'
            height='20'
          />
        </Link>
      </td>
    </tr>
  ));

  return (
    <table className='text-md mb-4 mt-12 w-auto rounded bg-white shadow-md'>
      <tbody>
        <tr className='border-b'>
          <th className='w-[24%] p-3 px-5 text-left text-xs lg:text-base'>
            Name{' '}
            <button
              className={`${sortByName && 'rotate-180'}`}
              onClick={() => sortTable('name')}
            >
              <Image src={SortingIcon} alt='sort' width='18' height='18' />
            </button>
          </th>
          <th className=' w-[24%] p-3 px-5 text-left text-xs lg:text-sm'>
            Phone{' '}
            {/* <button onClick={() => sortTable('phone')}>{sortingIcon}</button> */}
          </th>
          <th className=' w-[24%] p-3 px-5 text-left text-xs lg:text-sm'>
            Address
          </th>
          <th className=' w-[24%] p-3 px-5 text-left text-xs lg:text-sm'>
            Created At{' '}
            <button
              className={`${sortedByCreatedAt && 'rotate-180'}`}
              onClick={() => sortTable('date')}
            >
              <Image src={SortingIcon} alt='sort' width='18' height='18' />
            </button>
          </th>
          <th className=' w-[24%] p-3 px-5 text-left text-xs lg:text-sm'>
            Edit
          </th>
        </tr>
        {list}
      </tbody>
    </table>
  );
};

export default CompanyList;
