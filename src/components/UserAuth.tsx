'use client';

import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import ButtonSecondary from '@/components/ui/ButtonSecondary';
import { signInUserToFirebase } from '@/lib/firebase/userHandler';

type Props = {};

const UserAuth = (props: Props) => {
  const [signInData, setUserSignInData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [emailValidationError, setEmailValidationError] = useState({
    validate: false,
    value: '',
  });
  const [passwordValidationError, setPasswordValidationError] = useState({
    validate: false,
    value: '',
  });

  const handleInputChange = (event: React.FormEvent) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;

    setUserSignInData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const signInHandler = (event: FormEvent) => {
    event.preventDefault();
    if (
      signInData.email === '' ||
      signInData.email === null ||
      signInData.password.length < 8
    ) {
      if (
        signInData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        setEmailValidationError({
          validate: false,
          value: '',
        });
      } else if (signInData.email === '' || signInData.email === null) {
        setEmailValidationError({
          validate: true,
          value: 'Email is Required',
        });
      } else {
        setEmailValidationError({
          validate: true,
          value: 'Invalid Email Address',
        });
      }
      if (signInData.password.length < 8) {
        setPasswordValidationError({
          validate: true,
          value: 'Password Must be aleat 8 characters long',
        });
      }
      return;
    }
    setEmailValidationError({
      validate: false,
      value: '',
    });
    setPasswordValidationError({
      validate: false,
      value: '',
    });
    signInUserToFirebase(signInData);
  };

  return (
    <form onSubmit={signInHandler}>
      <h1 className='font-poppins text-4xl tracking-[-1.44px]'>Sign In</h1>
      <span className='font-roboto text-sm opacity-50'>
        Welcome Back! Please enter your details to continue.
      </span>
      <div className='flex flex-wrap'>
        <Input
          name='email'
          label='Email'
          for='email'
          type='email'
          placeholder='Enter Email Address'
          value={signInData.email}
          onChange={handleInputChange}
          validationString={emailValidationError.value}
          isValidationError={emailValidationError.validate}
        />
        <Input
          name='password'
          label='Password'
          for='password'
          type='password'
          placeholder='Enter Password'
          value={signInData.password}
          onChange={handleInputChange}
          validationString={passwordValidationError.value}
          isValidationError={passwordValidationError.validate}
        />
      </div>
      <div className='mb-6 justify-between md:flex md:items-center'>
        <div className='min-h-6 block'>
          <label>
            <input
              name='rememberMe'
              id='checkbox-1'
              className="ease-soft rounded-1.4 after:text-xxs after:duration-250 after:ease-soft-in-out duration-250 relative float-left ml-3 mt-1 h-5 w-5 cursor-pointer appearance-none border border-solid bg-white bg-contain bg-center bg-no-repeat align-top text-base transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\2713'] checked:border-0 checked:border-transparent checked:bg-transparent checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 checked:after:opacity-100 focus:ring-transparent"
              type='checkbox'
              onChange={handleInputChange}
            />
            <label
              htmlFor='checkbox-1'
              className='xs:ml-0 ml-2 mt-1 cursor-pointer select-none font-roboto text-xs text-slate-700'
            >
              Remember Me
            </label>
          </label>
        </div>
        <Link
          href='#'
          className='w-fit cursor-pointer text-xs font-medium underline'
        >
          Forgot Password
        </Link>
      </div>
      <div className='md:flex md:items-center'>
        <ButtonSecondary button={'Sign In'} />
      </div>
      <div className='text-right text-sm'>
        Don’t have an account?{' '}
        <Link
          className='text-sm text-blue-600 hover:underline'
          href='/auth/signup'
        >
          signup
        </Link>
      </div>
    </form>
  );
};

export default UserAuth;
