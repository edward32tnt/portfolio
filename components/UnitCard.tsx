import classNames from 'classnames';
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
          <p className=" text-stone-700 text-sm">{title}</p>
          <p className=" text-xl text-stone-500 text-right">{value}</p>
        </>
      )}
    </div>
  );
}
