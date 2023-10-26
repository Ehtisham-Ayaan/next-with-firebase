'use client';

import React, { lazy, Suspense, useEffect, useState } from 'react';
import DashboardCard from '../ui/DashboardCard';
import LoadingUI from '../ui/LoadingUI';
import UsersGroup from '@/images/UsersGroup.svg';
import { totalUsers } from '@/lib/firebase/userHandler';
import Image from 'next/image';
const UsersCount = lazy(() => import('./UsersCount'));

type Props = {};

const Users = (props: Props) => {
  const [users, setUsers] = useState('...');

  useEffect(() => {
    totalUsers().then((response) => setUsers(response.toString()));
  }, []);
  return (
    <DashboardCard>
      <div className='flex flex-col items-center justify-center gap-5'>
        <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white'>
          <Image src={UsersGroup} alt='users' />
        </div>

        <Suspense fallback={<LoadingUI />}>
          <UsersCount users={users} />
        </Suspense>
        <h6 className='block font-poppins'>No. of Users</h6>
      </div>
    </DashboardCard>
  );
};

export default Users;
