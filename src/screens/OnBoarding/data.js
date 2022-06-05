import { scale } from 'react-native-size-matters';

// const Image1 = require('../../../assets/images/onboarding/loving.png');
// const Image2 = require('../../../assets/images/onboarding/ice-cream.png');
const Splash = require('../../../assets/images/splash-1.png');
const Image1 = require('../../../assets/images/slider/1.jpg');
const Image2 = require('../../../assets/images/slider/2.jpg');
const Image3 = require('../../../assets/images/slider/3.jpg');
const Image4 = require('../../../assets/images/slider/4.jpg');
export default [
  {
    text: 'Do you want a family where love abounds?',
    source: Image1,
    textStyle: {
      paddingTop: scale(30),
    },
  },
  {
    text: 'Do you want a church that cares about your spirit, soul, and body?',
    source: Image2,
    style: {
      // width: scale(176),
      // height: scale(200),
    },
    textStyle: {
      width: scale(254),
    },
  },
  {
    text: 'Do you want a house committed to your spiritual nourishment?',
    source: Image3,
    style: {
      // width: scale(214),
      // height: scale(200),
    },
    textStyle: {
      width: scale(289),
    },
  },
  {
    text: 'Do you want a house where the supernatural is natural?',
    source: Image4,
    style: {
      // width: scale(214),
      // height: scale(200),
    },
    textStyle: {
      width: scale(289),
    },
  },
];

export const SplashImage = Splash;
