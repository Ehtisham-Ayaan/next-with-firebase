'use client';

import React, { lazy, Suspense, useState, useEffect } from 'react';
import DashboardCard from '../ui/DashboardCard';
import CompanyIcon from '@/images/company.svg';
import Image from 'next/image';
import { totalCompanies } from '@/lib/firebase/CompanyHandler';
import LoadingUI from '../ui/LoadingUI';
const CompaniesCount = lazy(() => import('./CompaniesCount'));

type Props = {};

const CompanyCard = (props: Props) => {
  const [companies, setCompanies] = useState('...');
  useEffect(() => {
    totalCompanies().then((response) => setCompanies(response.toString()));
  }, []);

  return (
    <DashboardCard>
      <div className='flex flex-col items-center justify-center gap-5'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white'>
          <Image src={CompanyIcon} alt='company' />
        </div>
        <Suspense fallback={<LoadingUI />}>
          <CompaniesCount companies={companies} />
        </Suspense>
        <h6 className='block font-poppins'>No. of Companies</h6>
      </div>
    </DashboardCard>
  );
};

export default CompanyCard;
