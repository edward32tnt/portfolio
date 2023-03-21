import { useRouter } from 'next/router';
import Link from 'next/link';
import { menuData } from '../libs/menus';
import cn from 'classnames';
import { Bars4Icon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';

const MenuPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { asPath } = useRouter();
  const currentPage = menuData.find((x) => x.route === asPath);
  const handleRouteChange = useCallback(() => {
    const isMD = window.matchMedia('(min-width: 768px)').matches;
    if (!isMD) setIsOpen(false);
  }, []);
  useEffect(() => {
    handleRouteChange();
    window.addEventListener('resize', handleRouteChange);
    return () => window.removeEventListener('resize', handleRouteChange);
  }, []);
  return (
    <section
      className={
        ' md:static text-left w-full md:w-1/6 min-w-2/8  bg-white md:bg-inherit z-50 md:z-auto md:rounded '
      }
    >
      <div
        className=" flex justify-between items-center md:hidden p-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className=" text-stone-600"> {currentPage?.name}</span>
        <Bars4Icon className="w-6 h-6 " />
      </div>
      <div
        className={
          ' border md:border-0 shadow-sm md:shadow-none md:flex md:flex-col md:w-30 md:static md:top-0 absolute top-20 right-4 bg-white md:bg-inherit w-10/12 md:w-auto ' +
          classNames({
            hidden: !isOpen,
            'md:static': true
          })
        }
      >
        {menuData.map((menu, index) => {
          return (
            <Link
              href={asPath !== menu.route ? menu.route : ''}
              onClick={handleRouteChange}
              key={`menuButton${index}`}
              className={cn({
                'big-btn': true,
                'big-btn-selected': asPath === menu.route,
                'p-2': true,
                group: true
              })}
            >
              {asPath !== menu.route ? (
                <menu.icon className="w-8 h-8 group-hover:stroke-white max-sm:hidden" />
              ) : (
                <menu.activeIcon className="w-8 h-8 max-sm:hidden" />
              )}
              <span className="group-hover:text-white max-sm:text-xs">
                {menu.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default MenuPanel;
