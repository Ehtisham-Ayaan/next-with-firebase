import React from 'react';
import Image from 'next/image';

type Props = {
  imgSrc: any;
};

const Previewer = async ({ imgSrc }: Props) => {
  return (
    <div className='w-full rounded bg-[#F2F2F2] px-8 pb-8 pt-6 shadow-md'>
      <Image src={imgSrc} alt='User Profile Picture' width='250' height='250' />
    </div>
  );
};

export default Previewer;
