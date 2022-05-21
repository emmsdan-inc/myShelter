import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../constants/Colors';
import { scale } from 'react-native-size-matters';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');
export default EStyleSheet.create({
  container: {
    backgroundColor: Colors().background,
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: scale(63),
    // position: 'absolute',
    // bottom: scale(width >= 750 ? 60 : 100),
  },
  horizontalContainer: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboarding: {
    width,
    height: hp('40%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: scale(238),
    height: scale(170),
  },
  navigator: {
    width: scale(100),
    height: '100%',
    position: 'absolute', // 80% of screen width
  },
  text: {
    color: Colors().blackGlaze, // global variable $textColor
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: scale(15),
    lineHeight: scale(24),
    textAlign: 'center',
    width: scale(280),
  },
});
