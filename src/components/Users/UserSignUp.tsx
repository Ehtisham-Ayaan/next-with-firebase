'use client';

import React, { FormEvent, useState } from 'react';
import ButtonSecondary from '@/components/ui/ButtonSecondary';
import Input from '@/components/ui/Input';
import { addUserToFirebase } from '@/lib/firebase/userHandler';
import ImagePicker from '@/components/ui/ImagePicker';

type Props = {};

const UserSignUp = (props: Props) => {
  const [signUpData, setUserSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dp: null,
    password: '',
    confirmPassword: '',
    termsAcceptance: false,
  });

  const [emailValidationError, setEmailValidationError] = useState({
    validate: false,
    value: '',
  });
  const [passwordValidationError, setPasswordValidationError] = useState({
    validate: false,
    value: '',
  });
  const [confirmPasswordValidationError, setConfirmPasswordValidationError] =
    useState({
      validate: false,
      value: '',
    });
  const [termsAcceptanceError, setTermsAcceptanceError] = useState(false);

  const handleInputChange = (event: React.FormEvent) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;

    if (name === 'phone') {
      const pattern = new RegExp(/^[0-9\b]+$/);
      if (value.length > 0 && !pattern.test(value)) {
        return;
      } else if (value.length > 11) {
        return;
      }
    }
    setUserSignUpData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const fileChangeHandler = (file: any) => {
    setUserSignUpData((prevData) => ({
      ...prevData,
      dp: file,
    }));
  };

  const handleValidations = () => {
    if (
      signUpData.email === '' ||
      signUpData.email === null ||
      signUpData.password.length < 8 ||
      signUpData.confirmPassword.length < 8 ||
      signUpData.password != signUpData.confirmPassword ||
      signUpData.termsAcceptance === false
    ) {
      if (
        signUpData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        setEmailValidationError({
          validate: false,
          value: '',
        });
      } else if (signUpData.email === '' || signUpData.email === null) {
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
      if (signUpData.password.length === 0) {
        setPasswordValidationError({
          validate: true,
          value: 'Password is Required',
        });
      } else if (signUpData.password.length < 8) {
        setPasswordValidationError({
          validate: true,
          value: 'Password Must be aleat 8 characters long',
        });
      } else {
        setPasswordValidationError({
          validate: false,
          value: '',
        });
      }
      if (signUpData.confirmPassword.length === 0) {
        setConfirmPasswordValidationError({
          validate: true,
          value: 'Confirm Password is Required',
        });
      } else if (signUpData.confirmPassword.length < 8) {
        setConfirmPasswordValidationError({
          validate: true,
          value: 'Confirm Password Must be aleat 8 characters long',
        });
      } else if (signUpData.password != signUpData.confirmPassword) {
        setConfirmPasswordValidationError({
          validate: true,
          value: 'Confirm Password Must Match Password',
        });
      } else {
        setConfirmPasswordValidationError({
          validate: false,
          value: '',
        });
      }
      if (signUpData.termsAcceptance == false) {
        setTermsAcceptanceError(true);
      } else setTermsAcceptanceError(false);
      return false;
    }
    return true;
  };

  const signUpHandler = (event: FormEvent) => {
    event.preventDefault();
    if (!handleValidations()) return;

    setEmailValidationError({ validate: false, value: '' });
    setPasswordValidationError({ validate: false, value: '' });
    setConfirmPasswordValidationError({ validate: false, value: '' });
    setTermsAcceptanceError(false);

    addUserToFirebase(signUpData);
  };

  return (
    <form onSubmit={signUpHandler} method='post'>
      <h1 className='font-poppins text-4xl font-medium'>Create Account</h1>
      <p className='font-BRSonoma-Regular block text-sm opacity-50'>
        Welcome Back! Please enter your details to continue.
      </p>
      <div className='flex'>
        <ImagePicker onFileChange={fileChangeHandler} />
      </div>
      <div className='flex gap-x-2'>
        <Input
          name='firstName'
          label='First Name'
          for='inline-first-name'
          type='text'
          placeholder='First Name'
          value={signUpData.firstName}
          onChange={handleInputChange}
        />
        <Input
          name='lastName'
          label='Last Name'
          for='inline-last-name'
          type='text'
          placeholder='Last Name'
          value={signUpData.lastName}
          onChange={handleInputChange}
        />
      </div>
      <div className='flex gap-x-2'>
        <Input
          name='email'
          label='Email Address'
          for='email'
          type='email'
          placeholder='Email Address'
          value={signUpData.email}
          onChange={handleInputChange}
          validationString={emailValidationError.value}
          isValidationError={emailValidationError.validate}
        />
        <Input
          name='phone'
          label='Phone Number'
          for='phone'
          type='text'
          placeholder='03004567890'
          value={signUpData.phone}
          onChange={handleInputChange}
        />
      </div>
      <Input
        name='address'
        label='Address'
        for='address'
        type='text'
        placeholder='Address'
        value={signUpData.address}
        onChange={handleInputChange}
      />
      <div className='flex gap-2'>
        <Input
          name='password'
          label='Password'
          for='password'
          type='password'
          placeholder='Enter Password'
          value={signUpData.password}
          onChange={handleInputChange}
          validationString={passwordValidationError.value}
          isValidationError={passwordValidationError.validate}
        />
        <Input
          name='confirmPassword'
          label='Confirm Password'
          for='confirm-password'
          type='password'
          placeholder='Enter Confirm Password'
          value={signUpData.confirmPassword}
          onChange={handleInputChange}
          validationString={confirmPasswordValidationError.value}
          isValidationError={confirmPasswordValidationError.validate}
        />
      </div>
      <div className='my-2 block'>
        <label>
          <input
            name='termsAcceptance'
            id='checkbox-1'
            className="ease-soft rounded-1.4 after:text-xxs after:duration-250 after:ease-soft-in-out duration-250 border-slate-150 relative float-left ml-3 mt-1 h-5 w-5 cursor-pointer appearance-none border border-solid bg-white bg-contain bg-center bg-no-repeat align-top text-base transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\2713'] checked:border-0 checked:border-transparent checked:bg-transparent checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 checked:after:opacity-100 focus:ring-transparent"
            type='checkbox'
            onChange={handleInputChange}
          />
          <label
            htmlFor='checkbox-1'
            className={`xs:ml-0 font-BRSonoma-Regular ml-2 cursor-pointer select-none text-xs ${
              termsAcceptanceError ? 'text-red-700' : 'text-slate-700'
            }`}
          >
            I agree to Terms of Service & Privacy Policy
          </label>
        </label>
      </div>

      <div className='md:flex md:items-center'>
        <ButtonSecondary button={'Sign Up'} />
      </div>
    </form>
  );
};

export default UserSignUp;
