import React from 'react';
import { Image, useColorScheme } from 'react-native';
import { scale } from 'react-native-size-matters';
import env from '../services/environment';

export function Logo() {
  const colorScheme = useColorScheme();

  return colorScheme !== 'dark' || !env.enableTheme ? (
    <Image
      source={require('../../assets/images/logo-black.png')}
      style={{ width: scale(130), height: scale(136) }}
    />
  ) : (
    <Image
      source={require('../../assets/images/logo-white.png')}
      style={{ width: scale(130), height: scale(136) }}
    />
  );
}

export default Logo;
