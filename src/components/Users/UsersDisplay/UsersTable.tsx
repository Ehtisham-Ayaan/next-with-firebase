'use client';

import React, { useEffect, useState } from 'react';
import { getAllUsers } from '@/lib/firebase/userHandler';
import SearchBar from '../../ui/SearchBar';
import Records from './Records';
import Pagination from '../../ui/Pagination/Pagination';
import UserEditModal from '../../ui/UserEditModal';

type Props = {};

const UsersTable = (props: Props) => {
  const [users, setUsers] = useState<any>([]);
  const [filteredUsers, setFilteredUsers] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [sorted, setSorted] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<string>('');
  const [fetchData, setFetchData] = useState<boolean>(false);
  const [userData, setUserData] = useState(null);

  const [sortedByName, setSortedByName] = useState<boolean>(false);
  const [sortedByCreatedAt, setSortedByCreatedAt] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(4);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const nPages =
    searchResults.length > 0
      ? Math.ceil(searchResults.length / recordsPerPage)
      : Math.ceil(users.length / recordsPerPage);
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const searchRecords = searchResults.slice(
    indexOfFirstRecord,
    indexOfLastRecord,
  );

  useEffect(() => {
    getAllUsers().then((res) => {
      const usersList = res.map((user: any) => user);
      setUsers(usersList);
      setFilteredUsers(usersList);
    });
  }, [fetchData]);

  useEffect(() => {
    searchResults.length > 0
      ? setFilteredUsers(searchRecords)
      : setFilteredUsers(currentRecords);

    currentPage > nPages && nPages != 0 && setCurrentPage(nPages);
  }, [users, currentPage, searchResults]);

  useEffect(() => {
    if (searchResults.length > 0) setFilteredUsers(searchRecords);
  }, [users, searchResults]);

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
    setSearchResults(filteredUsers);
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
        filteredUsers={filteredUsers}
        editUser={editUser}
        sortTable={sortTable}
        sortByName={sortedByName}
        sortedByCreatedAt={sortedByCreatedAt}
      />
      <Pagination
        nPages={nPages}
        indexOfFirstRecord={indexOfFirstRecord}
        indexOfLastRecord={indexOfLastRecord}
        totalRecords={
          searchResults.length > 0 ? searchResults.length : users.length
        }
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
