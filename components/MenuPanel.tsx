import { useRouter } from 'next/router';
import Link from 'next/link';
import { menuData } from '../libs/menus';
import cn from 'classnames';
const MenuPanel = () => {
  const { asPath } = useRouter();
  return (
    <section
      className={
        'rounded-xl text-left static w-2/8 min-w-2/8 flex' +
        'max-md:w-full max_md:flex-row max_md:fixed max_md:top-0'
      }
    >
      {menuData.map((menu, index) => {
        return (
          <Link
            href={asPath !== menu.route ? menu.route : ''}
            key={`menuButton${index}`}
            className={cn({
              'big-btn': true,
              'big-btn-selected': asPath === menu.route,
              group: true
            })}
          >
            {asPath !== menu.route ? (
              <menu.icon className="w-8 h-8 group-hover:stroke-white" />
            ) : (
              <menu.activeIcon className="w-8 h-8" />
            )}
            <span className="group-hover:text-white">{menu.name}</span>
          </Link>
        );
      })}
    </section>
  );
};

export default MenuPanel;
