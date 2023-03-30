import { ReactElement } from 'react';

interface Props {
  children?: ReactElement;
  onClose?: Function;
}
export default function Modal({ children, onClose }: Props) {
  return (
    <div
      className=" z-50 fixed top-0 min-w-full max-h-full  bg-black bg-opacity-60 ease-linear duration-200 flex justify-center items-center overflow-scroll"
      onClick={(e) => onClose && onClose(e)}
    >
      {children}
    </div>
  );
}
