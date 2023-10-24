import SideBar from '@/components/ui/SideBar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard | Next',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SideBar />
      <div className='mx-auto mt-10 w-[calc(100vw-490px)]'>{children}</div>
    </div>
  );
}