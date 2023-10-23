import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import Button from '../../Button';
import LinkMap from '../links';

const Navbar = ({ toggle }: { toggle: () => void }) => {
  return (
    <>
      <div className='sticky top-0 h-20 w-full bg-emerald-800'>
        <div className='container mx-auto h-full px-4'>
          <div className='flex h-full items-center justify-between'>
            <Logo />
            <button
              type='button'
              className='inline-flex items-center md:hidden'
              onClick={toggle}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='40'
                height='40'
                viewBox='0 0 24 24'
              >
                <path
                  fill='#fff'
                  d='M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z'
                />
              </svg>
            </button>
            <ul className='hidden gap-x-6 text-white md:flex'>
              <LinkMap isMobile={false} />
            </ul>
            <div className='flex gap-x-6'>
              <Link href='/auth/signin'>
                <Button button={'Sign In'} />
              </Link>
              <Link href='/auth/signup'>
                <Button button={'Sign Up'} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
