import React, { useState, useEffect, Suspense, lazy } from 'react';
import ImagePreviewModal from '@/components/ui/ImagePreviewModal';
import LoadingUI from '@/components/ui/LoadingUI';

const UserList = lazy(() => import('./UserList'));
const UserCard = lazy(() => import('./UserCard'));

type Props = {
  filteredUsers: any;
  editUser: any;
  sortByName: boolean;
  sortedByCreatedAt: boolean;
  sortTable: (type: string) => void;
};

const Records = ({
  filteredUsers,
  editUser,
  sortByName,
  sortedByCreatedAt,
  sortTable,
}: Props) => {
  const [imgSrc, setImgSrc] = useState<string>('');

  return (
    <div className='mb-3 bg-transparent'>
      <div className='hidden xl:block'>
        <Suspense fallback={<LoadingUI />}>
          <UserList
            filteredUsers={filteredUsers}
            setImgSrc={setImgSrc}
            editUser={editUser}
            sortByName={sortByName}
            sortTable={sortTable}
            sortedByCreatedAt={sortedByCreatedAt}
          />
        </Suspense>
      </div>

      <div className='flex flex-col gap-10 bg-transparent sm:flex xl:hidden'>
        <Suspense fallback={<LoadingUI />}>
          <UserCard
            filteredUsers={filteredUsers}
            setImgSrc={setImgSrc}
            editUser={editUser}
          />
        </Suspense>
      </div>
      <ImagePreviewModal imgSrc={imgSrc} setImgSrc={setImgSrc} />
    </div>
  );
};

export default Records;
