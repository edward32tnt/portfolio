import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function () {
  return (
    <div className="p-4 flex justify-center gap-2 items-center h-[100vh]">
      <ArrowPathIcon className="w-6 h-6 animate-in ease-linear spin-in-180 repeat-infinite duration-1000" />
      <span>Loading...</span>
    </div>
  );
}
