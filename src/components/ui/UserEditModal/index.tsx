import React, { useState, useRef, useEffect } from 'react';
import Input from '../Input';
import ImagePicker from '../ImagePicker';
import { updateThisUser } from '@/api/userHandler';

type Props = {
  user: any;
  editingUser: string;
  fetchData: boolean;
  cancelEditing: (string: string) => void;
  setFetchData: (fetch: boolean) => void;
};

const UserEditModal = ({
  user,
  editingUser,
  fetchData,
  cancelEditing,
  setFetchData,
}: Props) => {
  const [userUpdateData, setUserUpdateData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dp: null,
  });

  const userEditRef = useRef<any>(null);

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!userEditRef.current) return;
      if (!userEditRef.current?.contains(event.target)) {
        cancelEditing('');
      }
    };

    window.addEventListener('mousedown', handleOutSideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutSideClick);
    };
  }, [userEditRef]);

  const fileChangeHandler = (file: any) => {
    setUserUpdateData((prevData) => ({
      ...prevData,
      dp: file,
    }));
  };

  const updateCurrentUser = async () => {
    if (
      userUpdateData.firstName.length == 0 &&
      userUpdateData.lastName.length == 0 &&
      userUpdateData.phone.length == 0 &&
      userUpdateData.dp == null
    ) {
      alert('No update was found');
      return;
    }

    const updateUserData = {
      firstName:
        userUpdateData.firstName.length > 0
          ? userUpdateData.firstName
          : user.firstName,
      lastName:
        userUpdateData.lastName.length > 0
          ? userUpdateData.lastName
          : user.lastName,
      phone:
        userUpdateData.phone.length > 0 ? userUpdateData.phone : user.phone,
      dp: userUpdateData.dp != null ? userUpdateData.dp : user.dp,
    };

    await updateThisUser(editingUser, updateUserData, user.email);
    cancelEditing('');
    setUserUpdateData({
      firstName: '',
      lastName: '',
      phone: '',
      dp: null,
    });
    setFetchData(!fetchData);
  };

  const cancelUpdatingUser = () => {
    setUserUpdateData({
      firstName: '',
      lastName: '',
      phone: '',
      dp: null,
    });
    cancelEditing('');
  };

  const handleUserChange = (event: React.FormEvent) => {
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
    setUserUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {editingUser.length > 0 ? (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/80 shadow-2xl outline-none focus:outline-none'>
            <div className='relative mx-auto my-6 w-auto max-w-3xl'>
              <div
                ref={userEditRef}
                className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'
              >
                <div className='flex items-start justify-between rounded-t border-b border-solid border-gray-300 p-5 '>
                  <h3 className='font=semibold text-3xl'>Update User Info</h3>
                </div>
                <div className='relative flex-auto p-6'>
                  <form className='w-full rounded bg-[#F2F2F2] px-8 pb-8 pt-6 shadow-md'>
                    <div className='flex'>
                      <ImagePicker
                        imgUrl={user.dp}
                        onFileChange={fileChangeHandler}
                      />
                    </div>
                    <Input
                      name='firstName'
                      type='text'
                      label='First Name'
                      placeholder='First Name'
                      value={
                        userUpdateData.firstName
                          ? userUpdateData.firstName
                          : user.firstName
                      }
                      onChange={handleUserChange}
                    />
                    <Input
                      name='lastName'
                      type='text'
                      label='Last Name'
                      placeholder='Last Name'
                      value={
                        userUpdateData.lastName
                          ? userUpdateData.lastName
                          : user.lastName
                      }
                      onChange={handleUserChange}
                    />
                    <Input
                      name='phone'
                      type='text'
                      label='phone'
                      placeholder='(0300) 213-1432'
                      value={
                        userUpdateData.phone ? userUpdateData.phone : user.phone
                      }
                      onChange={handleUserChange}
                    />
                  </form>
                </div>
                <div className='border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6'>
                  <button
                    className='background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-emerald-800 outline-none focus:outline-none'
                    type='button'
                    onClick={cancelUpdatingUser}
                  >
                    Close
                  </button>
                  <button
                    className='mb-1 mr-1 rounded bg-emerald-800 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none hover:shadow-lg focus:outline-none active:bg-emerald-900'
                    type='button'
                    onClick={() => updateCurrentUser()}
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

export default UserEditModal;
