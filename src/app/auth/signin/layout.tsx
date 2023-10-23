import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sign In | Next',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className='min-h-[calc(100vh-90px)] w-full md:p-5'>
        <div className='rounded-xl bg-[#F2F2F2]'>
          <div className='mx-auto flex min-h-[calc(100vh-90px)] w-[360px] max-w-md items-center justify-center md:min-h-[calc(100vh-133px)]'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
