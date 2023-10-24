'use client';

import React, { useEffect, useState } from 'react';
import DashboardCard from './ui/DashboardCard';
import { getAllUsers } from '@/lib/firebase/userHandler';

type Props = {};

const Users = (props: Props) => {
  const [userList, setUsersList] = useState<any>([]);

  useEffect(() => {
    getAllUsers().then((res) => {
      const usersList = res.map((user: any) => user);
      setUsersList(usersList);
    });
  }, []);

  const UsersIcon = (): React.ReactNode => (
    <svg
      fill='none'
      height='27'
      viewBox='0 0 35 27'
      width='35'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.60001 12.6C7.1464 12.6 8.39999 11.3464 8.39999 9.8C8.39999 8.25361 7.1464 7 5.60001 7C4.05361 7 2.8 8.25361 2.8 9.8C2.8 11.3464 4.05361 12.6 5.60001 12.6Z'
        stroke='#4F4F4F'
        stroke-miterlimit='10'
        stroke-width='2'
      />
      <path
        d='M8.3 23.6H2.60001C1.70001 23.6 1.10001 22.9 1.10001 22V19.2C1.10001 17 2.8 15.3 5 15.3H8.5'
        stroke='#4F4F4F'
        stroke-miterlimit='10'
        stroke-width='2'
      />
      <path
        d='M17.6 10C20.0301 10 22 8.03007 22 5.60001C22 3.16996 20.0301 1.20001 17.6 1.20001C15.17 1.20001 13.2 3.16996 13.2 5.60001C13.2 8.03007 15.17 10 17.6 10Z'
        stroke='#4F4F4F'
        stroke-miterlimit='10'
        stroke-width='2'
      />
      <path
        d='M24.1 25.2H10.7C9.3 25.2 8.2 24.1 8.2 22.7V18.4C8.2 15 11.1 12.2 14.6 12.2H20.3C23.8 12.2 26.7 15 26.7 18.4V22.7C26.6 24.1 25.5 25.2 24.1 25.2Z'
        stroke='#4F4F4F'
        stroke-miterlimit='10'
        stroke-width='2'
      />
      <path
        d='M29 12.6C30.5464 12.6 31.8 11.3464 31.8 9.8C31.8 8.25361 30.5464 7 29 7C27.4536 7 26.2 8.25361 26.2 9.8C26.2 11.3464 27.4536 12.6 29 12.6Z'
        stroke='#4F4F4F'
        stroke-miterlimit='10'
        stroke-width='2'
      />
      <path
        d='M26.3 23.6H32C32.9 23.6 33.5 22.9 33.5 22V19.2C33.5 17 31.8 15.3 29.6 15.3H26.1'
        stroke='#4F4F4F'
        stroke-miterlimit='10'
        stroke-width='2'
      />
    </svg>
  );

  return (
    <DashboardCard>
      <div className='flex flex-col items-center justify-center gap-5'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white'>
          <UsersIcon />
        </div>
        <h2 className='block text-4xl font-semibold'>{userList.length}</h2>
        <h6 className='block font-poppins'>No. of Users</h6>
      </div>
    </DashboardCard>
  );
};

export default Users;