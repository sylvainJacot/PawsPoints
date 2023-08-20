import React from 'react';

// Navigation
import UserStack from './userStack';
import AuthStack from './authStack';

// Store
import UserProvider from '../../context/user-provider';

// Hooks
import { useAuthentication } from '../../utils/hooks/useAuthentication';

export default function RootNavigation() {

  const { user } = useAuthentication();

  return user ? 
    <UserProvider>
        <UserStack /> 
    </UserProvider>
  : 
  <AuthStack />;
}