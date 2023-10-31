'use client';

import React, { FormEvent, useState } from 'react';
import Input from '../ui/Input';
import ButtonSecondary from '../ui/ButtonSecondary';
import { addNewCompany, updateThisCompany } from '@/api/CompanyHandler';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {};

const CreateCompany = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('company') || '';
  const company = search.length > 0 ? JSON.parse(search) : null;

  const [companyData, setCompanyData] = useState({
    name: company?.name || '',
    phone: company?.phone || '',
    address: company?.address || '',
  });
  const [nameValidationError, setNameValidationError] = useState({
    validate: false,
    value: '',
  });

  const handleInputChange = (event: React.FormEvent) => {
    let { name, value } = event.target as HTMLInputElement;

    if (name === 'phone') {
      value = value.replace(/\D/g, '');
      var size = value.length;
      if (size > 0) {
        value = '(' + value;
      }
      if (size > 4) {
        value = value.slice(0, 5) + ') ' + value.slice(5, 12);
      }
      if (size > 7) {
        value = value.slice(0, 10) + '-' + value.slice(10);
      }
    }
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createCompanyHandler = (event: FormEvent) => {
    event.preventDefault();
    toast('Adding Your Company');
    if (companyData.name === '' || companyData.name === null) {
      setNameValidationError({
        validate: true,
        value: 'Name is Required',
      });
      toast.error('Validation Error');
      return;
    }
    addNewCompany(companyData);
    toast.success('Company Added Successfully');
    setCompanyData({ name: '', phone: '', address: '' });
  };

  const updateCompanyHandler = (event: FormEvent) => {
    event.preventDefault();
    toast('Updating Your Company');
    if (companyData.name === '' || companyData.name === null) {
      setNameValidationError({
        validate: true,
        value: 'Name is Required',
      });
      toast.error('Validation Error');
      return;
    }
    if (
      companyData.name == company.name &&
      companyData.phone == company.phone &&
      companyData.address == company.address
    ) {
      alert('No update was found');
      return;
    }

    const updateCompanyData = {
      name: companyData.name.length > 0 ? companyData.name : company.name,
      address:
        companyData.address.length > 0 ? companyData.address : company.address,
      phone: companyData.phone.length > 0 ? companyData.phone : company.phone,
    };

    updateThisCompany(company.id, updateCompanyData);
    toast.success('Company Updated Successfully');
    router.push('/dashboard/companies');
  };
  return (
    <>
      <form
        onSubmit={company?.id ? updateCompanyHandler : createCompanyHandler}
        method='post'
      >
        <h1 className='font-poppins text-4xl font-medium'>
          {company?.id ? 'Update' : 'Create'} Company
        </h1>
        <p className='font-BRSonoma-Regular block text-sm opacity-50'>
          Welcome to Add Company! Please enter your details to continue.
        </p>
        <Input
          name='name'
          label='Company Name'
          for='name'
          type='text'
          placeholder='Company Name'
          value={companyData.name}
          onChange={handleInputChange}
          validationString={nameValidationError.value}
          isValidationError={nameValidationError.validate}
        />
        <Input
          name='phone'
          label='Company Phone Number'
          for='phone'
          type='text'
          placeholder='(0300) 456-7890'
          value={companyData.phone}
          onChange={handleInputChange}
        />
        <Input
          name='address'
          label='Address'
          for='address'
          type='text'
          placeholder='Address'
          value={companyData.address}
          onChange={handleInputChange}
        />

        <div className='md:flex md:items-center'>
          <ButtonSecondary
            button={company?.id ? 'Update Company' : 'Add Company'}
          />
        </div>
      </form>
      <ToastContainer position='bottom-right' theme='dark' />
    </>
  );
};

export default CreateCompany;
