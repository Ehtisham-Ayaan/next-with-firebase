'use client';

import React, { useState, useEffect } from 'react';
import { getUserCompanies } from '@/lib/firebase/CompanyHandler';

import SearchBar from '../../ui/SearchBar';
import Records from './Records';
import Pagination from '../../ui/Pagination/Pagination';
import CompanyEditModal from '@/components/ui/CompanyEditModal';
import Link from 'next/link';

type Props = {};

const CompaniesTable = (props: Props) => {
  const [companies, setCompanies] = useState<any>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<any>([]);
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
  const nPages = Math.ceil(companies.length / recordsPerPage);

  useEffect(() => {
    getUserCompanies().then((res) => {
      const usersList = res.map((user: any) => user);
      setCompanies(usersList);
      setFilteredCompanies(usersList);
    });
  }, [fetchData]);

  useEffect(() => {
    const list = filteredCompanies.map((company: any, index: any) => (
      <tr
        key={company.id}
        className={`border-b hover:bg-orange-100 ${
          index % 2 === 0 ? 'bg-gray-100' : ''
        }`}
      >
        <td className='p-3 px-5'>{company.name}</td>
        <td className='p-3 px-5'>{company.phone}</td>
        <td className='p-3 px-5'>{company.address}</td>
        <td className='p-3 px-5'>{company.date.substring(0, 24)}</td>

        <td className='gap-5 p-3 px-5'>
          <Link
            href={{
              pathname: '/dashboard/companies/form',
              query: { company: JSON.stringify(company) },
            }}
            className='h-12 rounded-lg bg-emerald-800 px-5 py-3 font-bold text-white'
            onClick={() => editCompany(company)}
          >
            Edit
          </Link>
        </td>
      </tr>
    ));

    const cardslist = filteredCompanies.map((company: any) => (
      <div
        className='flex min-h-[20rem] w-full flex-col items-center justify-center gap-y-1 rounded-lg bg-gray-100 py-10 shadow'
        key={company.id}
      >
        <div className='font-poppins font-semibold'>{company.name}</div>
        <div>{company.phone}</div>
        <div>{company.address}</div>
        <div>{company.date.substring(0, 24)}</div>

        <Link
          href={{ pathname: '/about', query: { name: 'test' } }}
          className='h-12 rounded-lg bg-emerald-800 px-5 font-bold text-white'
          onClick={() => editCompany(company)}
        >
          Edit
        </Link>
      </div>
    ));
    setCompanyList(list);
    setCompanyCard(cardslist);
  }, [companies, filteredCompanies, sorted, editingCompany]);

  const editCompany = (company: any) => {
    setCompanyData(company);
    setEditingCompany(company.id);
  };

  useEffect(() => {
    setFilteredCompanies(currentRecords);
  }, [companies, currentPage]);

  const handleSearch = (keywords: string) => {
    let filteredUsers = companies.filter(
      (company: any) =>
        company.name.includes(keywords) ||
        company.phone.includes(keywords) ||
        company.address.includes(keywords),
    );
    setFilteredCompanies(filteredUsers);
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
        tableData={companyList}
        cardData={companyCard}
        sortTable={sortTable}
        sortByName={sortedByName}
        sortedByCreatedAt={sortedByCreatedAt}
      />
      <Pagination
        nPages={nPages}
        indexOfFirstRecord={indexOfFirstRecord}
        indexOfLastRecord={indexOfLastRecord}
        totalRecords={companies.length}
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
