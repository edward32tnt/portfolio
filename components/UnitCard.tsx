import { ReactElement } from 'react';

interface UnitCardProps {
  title?: string;
  value?: string;
  index?: number;
  className?: string;
  children?: ReactElement[];
}

export default function UnitCard({
  className,
  title = '',
  value = '',
  children
}: UnitCardProps) {
  return (
    <div className={className ? className : ' p-3 border-b w-full '}>
      {children ? (
        children
      ) : (
        <>
          <p className=" text-gray-400 text-sm">{title}</p>
          <p className=" text-xl text-right">{value}</p>
        </>
      )}
    </div>
  );
}
