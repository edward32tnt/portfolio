import { useRouter } from 'next/router';
import Link from 'next/link';
import { menuData } from '../libs/menus';
import cn from 'classnames';
import { Bars4Icon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useState } from 'react';
const MenuPanel = () => {
  const [isShowMenu, setIsShowMenu] = useState(true);
  const { asPath } = useRouter();
  const handleResize = useCallback(() => {
    const sm = window.matchMedia('not all and (min-width: 640px)').matches;
    setIsShowMenu(!sm);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <section
      className={
        'rounded-xl text-left max-sm:static w-2/8 min-w-2/8 flex flex-col ' +
        ' max-sm:top-0 max-sm:fixed max-sm:justify-between max-sm:w-full max-sm:bg-white max-sm:z-50 max-sm:rounded-none'
      }
    >
      <div className="sm:hidden p-2" onClick={() => setIsShowMenu(!isShowMenu)}>
        <Bars4Icon className="w-6 h-6" />
      </div>
      {isShowMenu &&
        menuData.map((menu, index) => {
          return (
            <Link
              href={asPath !== menu.route ? menu.route : ''}
              onClick={() => setIsShowMenu(false)}
              key={`menuButton${index}`}
              className={cn({
                'big-btn': true,
                'big-btn-selected': asPath === menu.route,
                'max-sm:p-2': true,
                group: true,
                'max-sm:text-center': true,
                'max-sm:rounded-none': true
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
    </section>
  );
};

export default MenuPanel;
