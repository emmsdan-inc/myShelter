import { Appearance } from 'react-native';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
export const basic = {
  primary: '#A8518A',
  primary2: '#C4C4C4',
  secondary: '#00afef',
  success: '#A8CF45',
  successDarker: '#465f06',
  error: '#ED3237',
  errorDarker: '#92070b',
  warning: '#eed02a',
  warningDarker: '#6a5903',
  darkGreenBlue: '#0B3D4F',
  border: 'rgba(255, 255, 255, .0)',
  notification: '#A8518A',
  card: 'rgba(255, 255, 255, .0)',
  grayText: 'rgba(244, 252, 255, 0.5)',
  blackGlaze: 'rgba(0, 17, 23, 0.65)',
  button: '#A8518A',
  darkBlueBlack: '#001117',
  blackWash: 'rgba(0, 17, 23, 0.3)',
  blackShadow: 'rgba(0, 17, 23, 0.13)',
  primaryWash: 'rgba(168, 81, 138, 0.15)',
  primaryShadow: 'rgba(247, 102, 210, 0.15)',
  skeleton: 'rgb(225,222,223)',
  skeletonError: '#ED3237',
  skeletonSuccess: '#A8CF45',
  skeletonWarning: '#eed02a',
  skeletonErrorFade: '#f3a3a3',
  white: '#fff',
  oldBackground: '#F4FCFF',
  initBackground: '#F4FCFF',
  onboarding: 'rgba(0, 17, 23, 0.15)',
};
const colors = {
  light: {
    ...basic,
    text: '#02202B',
    background: '#fcfcfc',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    textPlaceholder: '#ccc',
  },
  dark: {
    ...basic,
  
    text: '#FAFEFF',
    textPlaceholder: basic.grayText,
    background: '#02202B',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    blackGlaze: basic.white,
    darkBlueBlack: basic.grayText,
  },
};
export default function Colors(type) {
  const colorScheme = type || Appearance.getColorScheme();
  if (colorScheme === 'dark') {
    return { ...colors.dark, dark: true, isDark: true, colors: colors.dark };
  }
  return { ...colors.light, dark: false, colors: colors.light };
}
