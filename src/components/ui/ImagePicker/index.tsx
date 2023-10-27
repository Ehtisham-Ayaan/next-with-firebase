'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import EditIcon from '@/images/edit.svg';

type Props = {
  imgUrl?: string;
  onFileChange: (event: any) => void;
};

const ImagePicker = (props: Props) => {
  const [imgSrc, setImgSrc] = useState(props.imgUrl);
  const fileChange = (event: any) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e: any) {
        setImgSrc(e.target.result);
      };
    })(file);
    reader.readAsDataURL(file);
    props.onFileChange(file);
  };
  return (
    <div className='center group mx-auto'>
      <div className='h-36 w-36 rounded-full text-center shadow-lg'>
        <div className='h-36 w-36 rounded-full'>
          <Image
            className='mx-auto max-h-full max-w-full rounded-full object-contain object-center'
            src={
              imgSrc
                ? imgSrc
                : 'https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png'
            }
            alt='Avatar Upload'
            width='150'
            height='150'
          />
        </div>
        <label className='relative top-[-140px] hidden h-full w-full cursor-pointer rounded-full bg-black/30 group-hover:flex'>
          <span className='flex h-full w-full justify-around px-4 py-2 text-center text-sm leading-normal text-white'>
            <Image src={EditIcon} alt='change' width='20' height='20' />
          </span>
          <input
            className='focus:shadow-outline hidden w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
            name='image'
            type='file'
            accept='image/*'
            onChange={fileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ImagePicker;
