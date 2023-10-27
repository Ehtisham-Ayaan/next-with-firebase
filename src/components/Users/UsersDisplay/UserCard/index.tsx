import React from 'react';
import Image from 'next/image';

type Props = {
  filteredUsers: any;
  setImgSrc: any;
  editUser: any;
};

const UserCard = async ({ filteredUsers, setImgSrc, editUser }: Props) => {
  const cardslist = await filteredUsers.map((user: any) => (
    <div
      className='flex min-h-[20rem] w-full flex-col items-center justify-center gap-y-1 rounded-lg bg-gray-100 py-10 shadow'
      key={user.email}
    >
      {user.dp && (
        <div
          className='h-12 w-12 rounded-full'
          onClick={() => setImgSrc(user.dp)}
        >
          <Image
            className='mx-auto max-h-full max-w-full rounded-full object-contain object-center hover:cursor-pointer'
            src={user.dp}
            alt={user.firstName}
            width='50'
            height='50'
          />
        </div>
      )}
      <div className='font-poppins text-xs font-semibold sm:text-sm'>
        {user.firstName}
      </div>
      <div className='text-xs sm:text-sm'>{user.lastName}</div>
      <div className='text-xs sm:text-sm'>{user.email}</div>
      <div className='text-xs sm:text-sm'>{user.phone}</div>
      <div className='text-xs sm:text-sm'>{user.date.substring(0, 24)}</div>
      <button
        className='h-12 rounded-lg bg-emerald-800 px-5 font-bold text-white'
        onClick={() => editUser(user)}
      >
        Edit
      </button>
    </div>
  ));
  return <>{cardslist}</>;
};

export default UserCard;
