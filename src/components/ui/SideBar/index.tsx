'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import BurgerMenu from '@/images/burger-menu.svg';

type Props = {};

const SideBar = (props: Props) => {
  const pathname = usePathname();
  const sideBarRef = useRef<any>(null);
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!sideBarRef.current) return;
      if (!sideBarRef.current?.contains(event.target)) {
        setShowSideBar(false);
      }
    };

    window.addEventListener('mousedown', handleOutSideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutSideClick);
    };
  }, [sideBarRef]);

  const links = ['/dashboard', '/dashboard/users', '/dashboard/companies'];

  const linkMap = links.map((link) => {
    const activeLink = link === pathname || link === pathname.substring(0, 20);
    return (
      <Link
        key={link}
        className={`dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 focus:shadow-outline mt-2 block rounded-lg px-4 py-2 text-sm font-semibold capitalize text-gray-900 hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900 focus:outline-none ${
          activeLink
            ? 'dark-mode:bg-gray-700 bg-gray-200'
            : 'dark-mode:bg-transparent bg-transparent'
        }`}
        href={link}
        onClick={() => setShowSideBar(false)}
      >
        {link.split('/').pop()}
      </Link>
    );
  });

  return (
    <>
      {!showSideBar && (
        <Image
          className='absolute left-2 z-40 block hover:cursor-pointer lg:hidden'
          src={BurgerMenu}
          alt='menu'
          width='20'
          height='20'
          onClick={() => setShowSideBar(true)}
        />
      )}
      <nav className='absolute mt-[-2.5rem] hidden min-h-[calc(100vh-90px)] w-[200px] flex-grow bg-gray-50 px-4 pb-4 shadow-sm lg:block lg:overflow-y-auto lg:pb-0 '>
        {linkMap}
      </nav>
      {showSideBar && (
        <div className='fixed z-10 mt-[-2.5rem] h-screen w-screen bg-black/50'>
          <nav
            ref={sideBarRef}
            className='mt-[-0.32rem] min-h-[calc(100vh-90px)] w-[200px] flex-grow bg-gray-50 px-4 pb-4 shadow-sm '
          >
            {linkMap}
          </nav>
        </div>
      )}
    </>
  );
};

export default SideBar;
