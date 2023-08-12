import React from 'react';

// Types
import { StackScreenProps } from '@react-navigation/stack'; 
import { StackNavigationParamList } from '../../navigation/type';

// Component
import ProfileScreenClient from './variants/client-mode';
import ProfileScreenPro from './variants/pro-mode';

type ProfileScreenNavigationProps = StackScreenProps<StackNavigationParamList, 'Profile'>;

export default function ProfileScreen({ route }: ProfileScreenNavigationProps) {

    const { isProMode, isClientMode } = route.params;

  return (
    <React.Fragment>
      {isProMode ? <ProfileScreenPro /> : null}
      {isClientMode ? <ProfileScreenClient /> : null}
    </React.Fragment>
  );
}
