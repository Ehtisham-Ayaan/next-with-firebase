'use client';

import React, { useState, useEffect } from 'react';
import { getUserCompanies } from '@/lib/firebase/CompanyHandler';

import SearchBar from '../../ui/SearchBar';
import Records from './Records';
import Pagination from '../../ui/Pagination/Pagination';
// import CompanyEditModal from '@/components/ui/CompanyEditModal';

type Props = {};

const CompaniesTable = (props: Props) => {
  const [companies, setCompanies] = useState<any>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [companyList, setCompanyList] = useState(null);
  const [companyCard, setCompanyCard] = useState(null);
  const [sorted, setSorted] = useState(false);

  const [editingCompany, setEditingCompany] = useState('');
  const [fetchData, setFetchData] = useState(false);
  const [companyData, setCompanyData] = useState(null);

  const [sortedByName, setSortedByName] = useState(false);
  const [sortedByCreatedAt, setSortedByCreatedAt] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(2);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = companies.slice(indexOfFirstRecord, indexOfLastRecord);
  const searchRecords = searchResults.slice(
    indexOfFirstRecord,
    indexOfLastRecord,
  );

  const nPages =
    searchResults.length > 0
      ? Math.ceil(searchResults.length / recordsPerPage)
      : Math.ceil(companies.length / recordsPerPage);

  useEffect(() => {
    getUserCompanies().then((res) => {
      const usersList = res.map((user: any) => user);
      setCompanies(usersList);
      setFilteredCompanies(usersList);
    });
  }, [fetchData]);

  const editCompany = (company: any) => {
    setCompanyData(company);
    setEditingCompany(company.id);
  };

  useEffect(() => {
    searchResults.length > 0
      ? setFilteredCompanies(searchRecords)
      : setFilteredCompanies(currentRecords);

    currentPage > nPages && nPages != 0 && setCurrentPage(nPages);
  }, [companies, currentPage, searchResults]);

  const handleSearch = (keywords: string) => {
    let filteredUsers = companies.filter(
      (company: any) =>
        company.name.includes(keywords) ||
        company.phone.includes(keywords) ||
        company.address.includes(keywords),
    );
    setSearchResults(filteredUsers);
  };

  const sortTable = (type: string) => {
    let sortedCompanies: any = [];
    switch (type) {
      case 'name': {
        if (sortedByName) {
          sortedCompanies = filteredCompanies.reverse((a: any, b: any) =>
            a.name.localeCompare(b.name),
          );
          setSortedByName(false);
        } else {
          sortedCompanies = filteredCompanies.sort((a: any, b: any) =>
            a.name.localeCompare(b.name),
          );
          setSortedByName(true);
        }
        break;
      }
      case 'phone':
        sortedCompanies = filteredCompanies.sort((a: any, b: any) =>
          a.phone.localeCompare(b.phone),
        );
        break;
      case 'date': {
        if (sortedByCreatedAt) {
          sortedCompanies = filteredCompanies.reverse((a: any, b: any) =>
            a.date.localeCompare(b.date),
          );
          setSortedByCreatedAt(false);
        } else {
          sortedCompanies = filteredCompanies.sort((a: any, b: any) =>
            a.date.localeCompare(b.date),
          );
          setSortedByCreatedAt(true);
        }
        break;
      }
      default:
        sortedCompanies = filteredCompanies;
    }

    setFilteredCompanies(sortedCompanies);
    setSorted(!sorted);
  };

  return (
    <div className='mt-10'>
      <SearchBar onSearch={handleSearch} />
      <Records
        filteredCompanies={filteredCompanies}
        editCompany={editCompany}
        sortTable={sortTable}
        sortByName={sortedByName}
        sortedByCreatedAt={sortedByCreatedAt}
      />
      <Pagination
        nPages={nPages}
        indexOfFirstRecord={indexOfFirstRecord}
        indexOfLastRecord={indexOfLastRecord}
        totalRecords={
          searchResults.length > 0 ? searchResults.length : companies.length
        }
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {/* <CompanyEditModal
        fetchData={fetchData}
        setFetchData={setFetchData}
        editingCompany={editingCompany}
        cancelEditing={() => setEditingCompany('')}
        company={companyData}
      /> */}
    </div>
  );
};

export default CompaniesTable;
