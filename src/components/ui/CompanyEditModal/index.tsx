import React, { useState } from 'react';
import Input from '../Input';
import { updateThisCompany } from '@/lib/firebase/CompanyHandler';

type Props = {
  company: any;
  editingCompany: string;
  fetchData: boolean;
  cancelEditing: (string: string) => void;
  setFetchData: (fetch: boolean) => void;
};

const CompanyEditModal = (props: Props) => {
  const [companyUpdateData, setCompanyUpdateData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const updateCurrentCompany = async () => {
    if (
      companyUpdateData.name.length == 0 &&
      companyUpdateData.phone.length == 0 &&
      companyUpdateData.address.length == 0
    ) {
      alert('No update was found');
      return;
    }

    const updateCompanyData = {
      name:
        companyUpdateData.name.length > 0
          ? companyUpdateData.name
          : props.company.firstName,
      address:
        companyUpdateData.address.length > 0
          ? companyUpdateData.address
          : props.company.address,
      phone:
        companyUpdateData.phone.length > 0
          ? companyUpdateData.phone
          : props.company.phone,
    };

    updateThisCompany(props.editingCompany, updateCompanyData);
    props.cancelEditing('');
    setCompanyUpdateData({ name: '', phone: '', address: '' });
    props.setFetchData(!props.fetchData);
  };

  const cancelUpdatingCompany = () => {
    setCompanyUpdateData({
      name: '',
      phone: '',
      address: '',
    });
    props.cancelEditing('');
  };

  const handleCompanyChange = (event: React.FormEvent) => {
    const { name, value } = event.target as HTMLInputElement;

    if (name === 'phone') {
      const pattern = new RegExp(/^[0-9\b]+$/);
      if (value.length > 0 && !pattern.test(value)) {
        return;
      } else if (value.length > 11) {
        return;
      }
    }
    setCompanyUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {props.editingCompany.length > 0 ? (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/80 shadow-2xl outline-none focus:outline-none'>
            <div className='relative mx-auto my-6 w-auto max-w-3xl'>
              <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
                <div className='flex items-start justify-between rounded-t border-b border-solid border-gray-300 p-5 '>
                  <h3 className='font=semibold text-3xl'>
                    Update Company Info
                  </h3>
                  <button
                    className='float-right border-0 bg-transparent text-black'
                    onClick={() => props.cancelEditing('')}
                  >
                    <span className='opacity-7 block h-6 w-6 rounded-full bg-gray-100 py-0 text-xl text-red-500'>
                      x
                    </span>
                  </button>
                </div>
                <div className='relative flex-auto p-6'>
                  <form className='w-full rounded bg-[#F2F2F2] px-8 pb-8 pt-6 shadow-md'>
                    <Input
                      name='name'
                      type='text'
                      label='Company Name'
                      placeholder='Company Name'
                      value={
                        companyUpdateData.name
                          ? companyUpdateData.name
                          : props.company.name
                      }
                      onChange={handleCompanyChange}
                    />
                    <Input
                      name='address'
                      type='text'
                      label='Company Address'
                      placeholder='Company Address'
                      value={
                        companyUpdateData.address
                          ? companyUpdateData.address
                          : props.company.address
                      }
                      onChange={handleCompanyChange}
                    />
                    <Input
                      name='phone'
                      type='text'
                      label='Company Phone'
                      placeholder='03002131432'
                      value={
                        companyUpdateData.phone
                          ? companyUpdateData.phone
                          : props.company.phone
                      }
                      onChange={handleCompanyChange}
                    />
                  </form>
                </div>
                <div className='border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6'>
                  <button
                    className='background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-emerald-800 outline-none focus:outline-none'
                    type='button'
                    onClick={cancelUpdatingCompany}
                  >
                    Close
                  </button>
                  <button
                    className='mb-1 mr-1 rounded bg-emerald-800 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none hover:shadow-lg focus:outline-none active:bg-emerald-900'
                    type='button'
                    onClick={() => updateCurrentCompany()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CompanyEditModal;
