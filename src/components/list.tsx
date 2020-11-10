import React from 'react';

interface ListProps {
  size?: 'large' | 'small';
};

const List: React.FC<ListProps> = ({size, children}) => {
  const getClass = () =>
    [
      'list',
      size,
    ].join(' ');

  return (
    <ul className={getClass()}>
      {children}
    </ul>
  );
};

export default List;