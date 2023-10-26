import React from 'react';

type Props = {
  users: any;
};

const UsersCount = async (props: Props) => {
  return <span className='block text-4xl font-semibold'>{props.users}</span>;
};

export default UsersCount;
