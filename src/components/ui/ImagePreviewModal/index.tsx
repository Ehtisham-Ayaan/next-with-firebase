import React, { useRef, useEffect, Suspense, lazy } from 'react';
import LoadingUI from '../LoadingUI';

const Previewer = lazy(() => import('./Previewer'));

type Props = {
  imgSrc: string;
  setImgSrc: (string: string) => void;
};

const ImagePreviewModal = (props: Props) => {
  const previewer = useRef<any>(null);

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (!previewer.current) return;
      if (!previewer.current?.contains(event.target)) {
        props.setImgSrc('');
      }
    };

    window.addEventListener('mousedown', handleOutSideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutSideClick);
    };
  }, [previewer]);

  const cancelPreview = () => {
    props.setImgSrc('');
  };
  return (
    <>
      {props.imgSrc.length > 0 && (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/80 shadow-2xl outline-none focus:outline-none'>
            <div className='relative mx-auto my-6 w-auto max-w-3xl'>
              <div
                ref={previewer}
                className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'
              >
                <div className='relative flex-auto p-6'>
                  <Suspense fallback={<LoadingUI />}>
                    <Previewer imgSrc={props.imgSrc} />
                  </Suspense>
                </div>
                <div className='border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6'>
                  <button
                    className='background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-emerald-800 outline-none focus:outline-none'
                    type='button'
                    onClick={cancelPreview}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ImagePreviewModal;
