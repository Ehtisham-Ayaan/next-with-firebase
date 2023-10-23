'use client';

import Image from 'next/image';
import React, { useState } from 'react';

type Props = {
  onFileChange: (event: any) => void;
};

const ImagePicker = (props: Props) => {
  const [imgSrc, setImgSrc] = useState('');

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
          <img
            className='mx-auto max-h-full max-w-full rounded-full object-contain object-center'
            src={
              imgSrc
                ? imgSrc
                : 'https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png'
            }
            alt='Avatar Upload'
          />
        </div>
        <label className='-mt-16 hidden cursor-pointer group-hover:block'>
          <span className='rounded-full bg-gray-300 px-4 py-2 text-sm leading-normal text-black'>
            Change
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
