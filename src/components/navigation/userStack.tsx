import React, { useContext } from 'react';

// Sreens
import UserContext from '../../context/user-context';
import ProTabs from './user-tabs/pro-tabs';
import ClientTabs from './user-tabs/client-tabs';

function UserStack() {

  const { userData } = useContext(UserContext);

  return (
    userData?.proMode?.enabled ? <ProTabs /> : <ClientTabs />
  );
}

export default UserStack;