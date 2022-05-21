import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../constants/Colors';
import { scale } from 'react-native-size-matters';

export default EStyleSheet.create({
  tab: {
    paddingTop: scale(10),
    borderTopWidth: scale(4),
    borderColor: Colors().primary,
    width: scale(56),
    alignItems: 'center',
  },
  inactiveTab: {
    borderTopWidth: scale(0),
  },
  tabShadow: {
    backgroundColor: Colors().background,
    shadowOffset: {
      width: scale(1),
      height: -scale(1),
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 40,
    shadowColor: Colors().blackShadow,
  },
  mainTitle: {
    fontSize: scale(18),
    textAlign: 'center',
  },
});
