import { NavLink } from 'react-router-dom';

type MenuItemProps = {
  to: string;
  icon: string;
  title: string;
  description: string;
};

export const MenuItem = ({ to, icon, title, description }: MenuItemProps) => {
  return (
    <NavLink
      key={to}
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'flex justify-center bg-gray-800 rounded-md p-2 transition-colors'
          : 'flex justify-center hover:bg-gray-800 rounded-md p-2 transition-colors'
      }
    >
      <i className={`${icon} text-2xl mr-4 text-indigo-400`} />
      <div className='flex flex-col flex-grow'>
        <span className='text-white text-lg font-semibold'>{title}</span>
        <span className='text-gray-400 text-sm'>{description}</span>
      </div>
    </NavLink>
  );
};
