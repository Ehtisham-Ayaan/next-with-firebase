'use client';

import React, { useEffect, useState } from 'react';
import { getAllUsers } from '@/lib/firebase/userHandler';
import Image from 'next/image';
import SearchBar from '../ui/SearchBar';
import Records from './Records';
import Pagination from './Pagination';
import UserEditModal from '../ui/UserEditModal';

type Props = {};

const UsersTable = (props: Props) => {
  const [users, setUsers] = useState<any>([]);
  const [filteredUsers, setFilteredUsers] = useState<any>([]);
  const [userList, setUserList] = useState(null);
  const [userCard, setUserCard] = useState(null);
  const [sorted, setSorted] = useState(false);
  const [editingUser, setEditingUser] = useState('');
  const [fetchData, setFetchData] = useState(false);
  const [userData, setUserData] = useState(null);

  const [sortedByName, setSortedByName] = useState(false);
  const [sortedByCreatedAt, setSortedByCreatedAt] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(2);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(users.length / recordsPerPage);

  useEffect(() => {
    getAllUsers().then((res) => {
      const usersList = res.map((user: any) => user);
      setUsers(usersList);
      setFilteredUsers(usersList);
    });
  }, [fetchData]);

  useEffect(() => {
    const list = filteredUsers.map((user: any, index: any) => (
      <tr
        key={user.email}
        className={`border-b hover:bg-orange-100 ${
          index % 2 === 0 ? 'bg-gray-100' : ''
        }`}
      >
        <td className='p-3 px-5'>{user.firstName}</td>
        <td className='p-3 px-5'>{user.lastName}</td>
        <td className='p-3 px-5'>{user.email}</td>
        <td className='p-3 px-5'>{user.phone}</td>
        <td className='p-3 px-5'>{user.date.substring(0, 24)}</td>
        <td className='p-3 px-5'>
          {user.dp && (
            <Image src={user.dp} alt={user.firstName} width='50' height='50' />
          )}
        </td>
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

    const cardslist = filteredUsers.map((user: any) => (
      <div
        className='flex min-h-[20rem] w-full flex-col items-center justify-center gap-y-1 rounded-lg bg-gray-100 py-10 shadow'
        key={user.email}
      >
        <div className='font-poppins font-semibold'>{user.firstName}</div>
        <div>{user.lastName}</div>
        <div>{user.email}</div>
        <div>{user.phone}</div>
        <div>{user.date.substring(0, 24)}</div>

        {user.dp && (
          <Image src={user.dp} alt={user.firstName} width='50' height='50' />
        )}
        <button
          className='h-12 rounded-lg bg-emerald-800 px-5 font-bold text-white'
          onClick={() => editUser(user)}
        >
          Edit
        </button>
      </div>
    ));
    setUserList(list);
    setUserCard(cardslist);
  }, [users, filteredUsers, sorted, editingUser]);

  useEffect(() => {
    setFilteredUsers(currentRecords);
  }, [users, currentPage]);

  const editUser = (user: any) => {
    setUserData(user);
    setEditingUser(user.id);
  };

  const handleSearch = (keywords: string) => {
    let filteredUsers = users.filter(
      (user: any) =>
        user.firstName.includes(keywords) ||
        user.lastName.includes(keywords) ||
        user.email.includes(keywords) ||
        user.phone.includes(keywords),
    );
    setFilteredUsers(filteredUsers);
  };

  const sortTable = (type: string) => {
    let sortedUsers: any = [];
    switch (type) {
      case 'firstName': {
        if (sortedByName) {
          sortedUsers = filteredUsers.reverse((a: any, b: any) =>
            a.firstName.localeCompare(b.firstName),
          );
          setSortedByName(false);
        } else {
          sortedUsers = filteredUsers.sort((a: any, b: any) =>
            a.firstName.localeCompare(b.firstName),
          );
          setSortedByName(true);
        }
        break;
      }
      case 'email':
        sortedUsers = filteredUsers.sort((a: any, b: any) =>
          a.email.localeCompare(b.email),
        );
        break;
      case 'phone':
        sortedUsers = filteredUsers.sort((a: any, b: any) =>
          a.phone.localeCompare(b.phone),
        );
        break;
      case 'date': {
        if (sortedByCreatedAt) {
          sortedUsers = filteredUsers.reverse((a: any, b: any) =>
            a.date.localeCompare(b.date),
          );
          setSortedByCreatedAt(false);
        } else {
          sortedUsers = filteredUsers.sort((a: any, b: any) =>
            a.date.localeCompare(b.date),
          );
          setSortedByCreatedAt(true);
        }
        break;
      }
      default:
        sortedUsers = filteredUsers;
    }

    setFilteredUsers(sortedUsers);
    setSorted(!sorted);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <Records
        tableData={userList}
        cardData={userCard}
        sortTable={sortTable}
        sortByName={sortedByName}
        sortedByCreatedAt={sortedByCreatedAt}
      />
      <Pagination
        nPages={nPages}
        indexOfFirstRecord={indexOfFirstRecord}
        indexOfLastRecord={indexOfLastRecord}
        totalRecords={users.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <UserEditModal
        fetchData={fetchData}
        setFetchData={setFetchData}
        editingUser={editingUser}
        cancelEditing={() => setEditingUser('')}
        user={userData}
      />
    </>
  );
};

export default UsersTable;
