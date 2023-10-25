import CompanyCard from '@/components/Companies/CompanyCard';
import Users from '@/components/Users/Users';
import React from 'react';

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <div>
      <span className='block text-center font-poppins text-2xl font-bold'>
        Dashboard Page
      </span>
      <div className='mt-5 flex flex-wrap content-center justify-center gap-10'>
        <Users />
        <CompanyCard />
      </div>
    </div>
  );
};

export default DashboardPage;
