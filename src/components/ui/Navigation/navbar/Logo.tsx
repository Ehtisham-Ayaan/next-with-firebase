'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../../Button';
import logo from '@/images/logo.svg';

const Logo = () => {
  //update the size of the logo when the size of the screen changes
  const [width, setWidth] = useState(0);

  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    updateWidth();
  }, []);

  // change between the logo and the button when the user scrolls
  const [showButton, setShowButton] = useState(false);

  const changeNavButton = () => {
    if (window.scrollY >= 400 && window.innerWidth < 768) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNavButton);
  }, []);

  return (
    <>
      <Link href='/' style={{ display: showButton ? 'none' : 'block' }}>
        <Image
          src={logo}
          alt='Logo'
          width={width < 1024 ? '60' : '100'}
          height={width < 1024 ? '30' : '54'}
          className='relative'
        />
      </Link>
      <Link
        href='/'
        style={{
          display: showButton ? 'block' : 'none',
        }}
      >
        <Button button='Home' />
      </Link>
    </>
  );
};

export default Logo;
