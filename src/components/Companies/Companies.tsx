'use client';

import { useRouter } from 'next/navigation';

import { getSignedInUser } from '@/api/userHandler';
import React from 'react';
import CompaniesTable from './CompaniesDisplay/CompaniesTable';

type Props = {};

const Companies = (props: Props) => {
  const router = useRouter();

  const addNewCompany = async () => {
    const user = await getSignedInUser()
      .then((res: any) => {
        return res;
      })
      .catch((err) => {
        alert('Please Sign in again');
      });

    if (user?.uid) {
      router.push('/dashboard/companies/form');
    } else {
      alert('Please Sign In to continue');
    }
  };
  return (
    <>
      <div className='flex justify-between'>
        <div>
          <h2 className='text-lg font-semibold'>User Companies</h2>
        </div>
        <button
          className='float-right h-12 rounded-lg bg-emerald-800 px-5 text-xs font-semibold text-white lg:text-sm'
          onClick={addNewCompany}
        >
          Add New Company
        </button>
      </div>
      <CompaniesTable />
    </>
  );
};

export default Companies;
