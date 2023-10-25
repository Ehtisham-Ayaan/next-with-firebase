'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {};

const SideBar = (props: Props) => {
  const pathname = usePathname();
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
      >
        {link.split('/').pop()}
      </Link>
    );
  });

  return (
    <nav className='absolute mt-[-2.5rem] block min-h-[calc(100vh-90px)] w-[200px] flex-grow bg-gray-50 px-4 pb-4 shadow-sm md:block md:overflow-y-auto md:pb-0 '>
      {linkMap}
    </nav>
  );
};

export default SideBar;
