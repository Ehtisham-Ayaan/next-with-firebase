import React from 'react';

type Props = {};

const AboutPage = (props: Props) => {
  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <div>
        <h2 className='text-xl font-semibold'>
          Beautiful Next app <em className='font-bold'>About Page</em>
        </h2>
      </div>
    </main>
  );
};

export default AboutPage;
