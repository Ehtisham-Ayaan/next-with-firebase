import React from 'react';

type Props = {
  companies: any;
};

const CompaniesCount = async (props: Props) => {
  return (
    <span className='block text-4xl font-semibold'>{props.companies}</span>
  );
};

export default CompaniesCount;
