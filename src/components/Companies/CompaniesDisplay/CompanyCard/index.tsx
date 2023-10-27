import React from 'react';
import Link from 'next/link';

type Props = {
  filteredCompanies: any;
  editCompany: (string: string) => void;
};

const CompanyCard = async ({ filteredCompanies, editCompany }: Props) => {
  const cardslist = filteredCompanies.map((company: any) => (
    <div
      className='flex min-h-[10rem] w-full flex-col items-center justify-center gap-y-1 rounded-lg bg-gray-100 py-10 shadow'
      key={company.id}
    >
      <div className='font-poppins text-xs font-semibold sm:text-sm'>
        {company.name}
      </div>
      <div className='text-xs sm:text-sm'>{company.phone}</div>
      <div className='text-xs sm:text-sm'>{company.address}</div>
      <div className='text-xs sm:text-sm'>{company.date.substring(0, 24)}</div>

      <Link
        href={{
          pathname: '/dashboard/companies/form',
          query: { company: JSON.stringify(company) },
        }}
        className='h-12 rounded-lg bg-emerald-800 px-5 py-3 font-bold text-white'
        onClick={() => editCompany(company)}
      >
        Edit
      </Link>
    </div>
  ));
  return <>{cardslist}</>;
};

export default CompanyCard;
