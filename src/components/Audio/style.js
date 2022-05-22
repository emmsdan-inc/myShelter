import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../constants/Colors';
import { scale } from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default EStyleSheet.create({
  audioImageCard: {
    width: scale(146),
    height: scale(74),
    borderRadius: scale(10),
    marginHorizontal: scale(5),
    marginVertical: scale(5),
    backgroundColor: Colors().primary2,
  },
  audioListCard: {
    // width: scale(146),
    height: scale(54),
    borderRadius: scale(10),
    flex: 1,
    flexDirection: 'row',
    marginVertical: scale(15),
  },
  audioListCardImage: {
    borderRadius: scale(30),
    height: scale(54),
    width: scale(54),
    marginRight: scale(10),
  },
  audioListCardContent: {
    width: scale(210),
  },
  audioListCardIcon: {
    transform: [{ rotate: '90deg' }],
    justifyContent: 'center',
    paddingRight: scale(30),
    paddingLeft: scale(15),
    paddingTop: scale(10),
    marginTop: scale(15),
  },
  audioListCardTitle: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: scale(14),
    color: Colors().blackGlaze,
    marginBottom: scale(5),
  },
  audioListCardSmallFont: {
    fontFamily: 'Nunito',
    fontSize: scale(10),
    fontWeight: '300',
    color: Colors().darkBlueBlack,
  },
  audioListCardAuthor: {
    fontSize: scale(12),
    width: scale(152),
    color: Colors().blackWash,
    fontFamily: 'Nunito',
  },
  audioListCardDropDown: {
    marginBottom: 10,
    position: 'absolute',
    right: scale(20),
    // bottom: scale(50),
    backgroundColor: Colors().background,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors().isDark ? Colors().background : Colors().primary,
    width: 100,
    zIndex: 100,
  },
  dropDownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: hp('100%'),
    width: wp('100%'),
  },
  miniPlayerContainer: {
    flexDirection: 'row',
    // height: 70,
    backgroundColor: Colors().background,
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 5,
    // borderWidth: 1
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderColor: Colors().primary,
    shadowOffset: {
      width: scale(1),
      height: -scale(1),
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 40,
    shadowColor: Colors().primaryShadow,
  },
  miniPlayerIcon: {
    borderRadius: scale(30),
    height: scale(46),
    width: scale(46),
    marginRight: scale(7),
  },
  miniPlayerTitle: {
    fontFamily: 'Nunito_Bold',
    fontSize: scale(12),
    color: Colors().primary,
  },
  miniPlayerAuthor: {
    fontFamily: 'nunito',
    fontSize: scale(10),
    fontWeight: '300',
    color: Colors().blackGlaze,
  },
});
