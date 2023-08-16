import React from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { UniqueCodeQRProps } from './types';

const UniqueCodeQR: React.FC<UniqueCodeQRProps> = ({ uniqueCode = 'hello'}) => {

  if (uniqueCode === undefined) {
    return null; // Or some fallback UI
  }

  return (
    <View>
      <QRCode
        value={uniqueCode}
        color="red"
        backgroundColor="white"
        size={200} 
      />
    </View>
  );
};

export default UniqueCodeQR;