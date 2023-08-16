import React from 'react';

// Navigation
import UserStack from './userStack';
import AuthStack from './authStack';

// Store
import UserProvider from '../../context/user-provider';

import ErrorBoundaries from '../error'

// Hooks
import { useAuthentication } from '../../utils/hooks/useAuthentication';

export default function RootNavigation() {

  const { user } = useAuthentication();

  return user ? 
  <ErrorBoundaries>
      <UserProvider>
          <UserStack /> 
      </UserProvider>
  </ErrorBoundaries>
  : 
  <AuthStack />;
}