import React, { Fragment } from 'react';

type Props = {
  children: React.ReactNode;
};

const DashboardCard = (props: Props) => {
  return (
    <Fragment>
      <div className='flex h-[170px] w-[calc(100vw-90px)] items-center justify-center bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white shadow-lg md:w-[460px]'>
        {props.children}
      </div>
    </Fragment>
  );
};

export default DashboardCard;
