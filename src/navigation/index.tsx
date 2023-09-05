import React from 'react';

// Navigation
import UserStack from './stacks/user-stack';
import AuthStack from './stacks/auth-stack';

// Store
import UserProvider from '../context/user-provider';

// Hooks
import { useAuthentication } from '../utils/hooks/useAuthentication';

export default function RootNavigation() {

  const { user } = useAuthentication();

  return user ? 
    <UserProvider>
        <UserStack /> 
    </UserProvider>
  : 
  <AuthStack />;
}