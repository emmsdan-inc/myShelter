import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../../constants/Colors';
import { scale } from 'react-native-size-matters';
export default EStyleSheet.create({
  inputContainer: {
    paddingHorizontal: 20,
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors().primary,
    color: Colors().text,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 4,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: { fontFamily: 'nunito', fontSize: 12 },
  inputSearch: {
    borderWidth: 1,
    borderColor: Colors().primary,
    borderRadius: scale(10),
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
    flex: 1,
    height: scale(48),
    fontFamily: 'nunito',
    fontSize: 16,
  },
  searchIcon: { position: 'absolute', right: scale(20), top: scale(16), marginTop: -scale(5) },
});
