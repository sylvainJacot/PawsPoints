import React from 'react';
import { CardCreationScreenNavigationProps } from '../../types/screens/cardcreation-screen';


export default function CardCreation({route }: CardCreationScreenNavigationProps) {

    const { proMode } = route.params;

  return (
    <React.Fragment>
        {proMode?.enabled}
        CardCreation
    </React.Fragment>
  );
}
