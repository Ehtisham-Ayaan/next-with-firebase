import React from 'react';
import Image from 'next/image';
import SortingIcon from '@/images/sortingIcon.svg';

type Props = {
  filteredUsers: any;
  setImgSrc: any;
  editUser: any;
  sortByName: any;
  sortedByCreatedAt: any;
  sortTable: (string: string) => void;
};

const UserList = async ({ filteredUsers, setImgSrc, editUser, sortByName, sortTable, sortedByCreatedAt }: Props) => {
  const list = filteredUsers.map((user: any, index: any) => (
    <tr
      key={user.email}
      className={`border-b hover:bg-orange-100 ${
        index % 2 === 0 ? 'bg-gray-100' : ''
      }`}
    >
      <td className='flex items-center p-3 px-5'>
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
        <div className='ml-2'>{user.firstName}</div>
      </td>
      <td className='p-3 px-5'>{user.lastName}</td>
      <td className='p-3 px-5'>{user.email}</td>
      <td className='p-3 px-5'>{user.phone}</td>
      <td className='p-3 px-5'>{user.date.substring(0, 24)}</td>
      <td className='gap-5 p-3 px-5'>
        <button
          className='h-12 rounded-lg bg-emerald-800 px-5 font-bold text-white'
          onClick={() => editUser(user)}
        >
          Edit
        </button>
      </td>
    </tr>
  ));

  return (
    <table className='text-md mb-4 w-auto rounded bg-white shadow-md '>
      <tbody>
        <tr className='border-b '>
          <th className='w-[18%] p-3 px-5 text-left'>
            First Name{' '}
            <button
              className={`${sortByName && 'rotate-180'}`}
              onClick={() => sortTable('firstName')}
            >
              <Image src={SortingIcon} alt='sorting icon' />
            </button>
          </th>
          <th className='w-[17%] p-3 px-5 text-left'>
            Last Name{' '}
            {/* <button
          className={`${sortByName && 'rotate-180'}`}
          onClick={() => sortTable('firstName')}
        >
          {sortingIcon}
        </button> */}
          </th>
          <th className='w-[17%] p-3 px-5 text-left'>
            Email{' '}
            {/* <button onClick={() => sortTable('email')}>{sortingIcon}</button> */}
          </th>
          <th className='w-[17%] p-3 px-5 text-left'>
            Phone{' '}
            {/* <button onClick={() => sortTable('phone')}>{sortingIcon}</button> */}
          </th>
          <th className='w-[17%] p-3 px-5 text-left'>
            Created At{' '}
            <button
              className={`${sortedByCreatedAt && 'rotate-180'}`}
              onClick={() => sortTable('date')}
            >
              <Image src={SortingIcon} alt='sorting icon' />
            </button>
          </th>
          <th className='w-[17%] p-3 px-5 text-left'>Edit</th>
        </tr>

        {list}
      </tbody>
    </table>
  );
};

export default UserList;
