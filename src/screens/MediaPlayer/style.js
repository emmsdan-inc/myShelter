import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../constants/Colors';
import { scale } from 'react-native-size-matters';
export default EStyleSheet.create({
  title: {
    fontSize: scale(19),
    color: Colors().text,
    fontFamily: 'Nunito_700Bold',
    fontStyle: 'normal',
    lineHeight: scale(27),
  },
  author: {
    fontSize: scale(16),
    color: Colors().blackGlaze,
    fontFamily: 'nunito',
    fontStyle: 'normal',
  },
  rotate: {
    transform: [{ rotate: '90deg' }],
  },
});
