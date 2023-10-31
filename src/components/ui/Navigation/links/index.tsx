import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AuthContext } from '@/context/auth_context';
import { useContext } from 'react';

type Props = {
  isMobile: boolean;
  onToggle?: () => void;
};

const Links = (props: Props): JSX.Element => {
  const currentUser = useContext(AuthContext);
  const pathname = usePathname();
  const links = ['/about', '/services', '/contacts', ''];

  currentUser?.currentUser && links.push('/dashboard');

  const handleToggle = () => {
    if (!props.isMobile) return;
    else props.onToggle && props.onToggle();
  };

  const linkMap = links.map((link) => {
    const activeLink = link === pathname || pathname.match(link);
    return (
      <li key={link}>
        <Link
          className={`capitalize ${activeLink ? 'font-bold' : ''}`}
          href={link}
          onClick={handleToggle}
        >
          {link.substring(1)}
        </Link>
      </li>
    );
  });

  return <>{linkMap}</>;
};

export default Links;
