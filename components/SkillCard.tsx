import classNames from 'classnames';

interface Props {
  title: string;
  value: number;
}
export default function SkillCard({ title, value }: Props) {
  return (
    <div className="p-2 border-b">
      <p className=" text-slate-600 text-md text-left opacity-80">{title}</p>
      <div className="flex w-full justify-center items-center gap-4">
        <div className="bg-gray-300 h-3 rounded w-full">
          <div
            className="bg-slate-400 h-3 rounded"
            style={{
              width: value * 10 + '%'
            }}
          ></div>
        </div>
        <span className=" text-slate-600 text-sm opc">{value}</span>
      </div>
    </div>
  );
}
