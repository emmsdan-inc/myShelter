import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../constants/Colors';
import { scale } from 'react-native-size-matters';

export default EStyleSheet.create({
  title: {
    fontSize: scale(16),
    color: Colors().black,
    fontFamily: 'Nunito_600SemiBold',
    fontStyle: 'normal',
  },
  seeMoreText: {
    fontSize: scale(12),
    color: Colors().primary,
    fontFamily: 'nunito',
    fontStyle: 'normal',
  },
  seeMoreBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors().primary,
    marginRight: scale(10),
  },
});
