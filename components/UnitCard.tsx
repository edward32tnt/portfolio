interface UnitCardProps {
  title: string;
  value: string;
  index: number;
}

export default function UnitCard({ title, value, index }: UnitCardProps) {
  const isRight = index % 2 ? '' : 'border-r';
  return (
    <div className={'p-3 border-b w-full ' + isRight}>
      <p className=" text-gray-400 text-sm">{title}</p>
      <p className=" text-xl text-right">{value}</p>
    </div>
  );
}
