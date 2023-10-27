import React from 'react';
import Image from 'next/image';
import EditIcon from '@/images/edit.svg';
import SortingIcon from '@/images/sortingIcon.svg';

type Props = {
  filteredUsers: any;
  setImgSrc: any;
  editUser: any;
  sortByName: any;
  sortedByCreatedAt: any;
  sortTable: (string: string) => void;
};

const UserList = async ({
  filteredUsers,
  setImgSrc,
  editUser,
  sortByName,
  sortTable,
  sortedByCreatedAt,
}: Props) => {
  const list = filteredUsers.map((user: any, index: any) => (
    <tr
      key={user.email}
      className={`border-b hover:bg-orange-100 ${
        index % 2 === 0 ? 'bg-gray-100' : ''
      }`}
    >
      <td className='flex w-full items-center p-3'>
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
        <span
          title={user.firstName}
          className='line-clamp-1 text-xs hover:text-clip lg:text-sm xl:px-5'
        >
          {user.firstName}
        </span>
      </td>

      <td className='w-[18%] p-3'>
        <span
          title={user.lastName}
          className='line-clamp-1 text-xs hover:text-clip lg:text-sm xl:px-2'
        >
          {user.lastName}
        </span>
      </td>

      <td className='w-[18%] p-3'>
        <span
          title={user.email}
          className='line-clamp-1 text-xs hover:text-clip lg:text-sm xl:px-2'
        >
          {user.email}
        </span>
      </td>
      <td className='w-[18%] p-3 text-xs lg:text-sm xl:px-2'>{user.phone}</td>

      <td className='w-[18%] p-3'>
        <span
          title={user.date.substring(0, 24)}
          className='line-clamp-1 text-xs hover:text-clip lg:text-sm xl:px-2'
        >
          {user.date.substring(0, 24)}
        </span>
      </td>
      <td className='gap-5 px-5 text-xs'>
        <Image
          className='hover:cursor-pointer'
          onClick={() => editUser(user)}
          src={EditIcon}
          alt='edit'
          width='20'
          height='20'
        />
      </td>
    </tr>
  ));

  return (
    <table className='text-md mb-4 mt-12 w-auto rounded bg-white shadow-md'>
      <tbody>
        <tr className='border-b'>
          <th className='w-[18%] p-3 px-5 text-left text-xs lg:text-sm'>
            First Name{' '}
            <button
              className={`${sortByName && 'rotate-180'}`}
              onClick={() => sortTable('firstName')}
            >
              <Image
                src={SortingIcon}
                alt='sorting icon'
                width='18'
                height='18'
              />
            </button>
          </th>
          <th className='w-[18%] p-3 text-left text-xs lg:text-sm xl:px-5'>
            Last Name
          </th>
          <th className='w-[18%] p-3 text-left text-xs lg:text-sm xl:px-5'>
            Email
          </th>
          <th className='w-[18%] p-3 text-left text-xs lg:text-sm xl:px-5'>
            Phone
          </th>
          <th className='w-[22%] p-3 text-left text-xs lg:text-sm xl:px-5'>
            Created At{' '}
            <button
              className={`${sortedByCreatedAt && 'rotate-180'}`}
              onClick={() => sortTable('date')}
            >
              <Image
                src={SortingIcon}
                alt='sorting icon'
                width='18'
                height='18'
              />
            </button>
          </th>
          <th className='w-[18%] p-3 px-5 text-left text-xs lg:text-sm'>
            Edit
          </th>
        </tr>

        {list}
      </tbody>
    </table>
  );
};

export default UserList;
