import EStyleSheet from "react-native-extended-stylesheet";
import Colors from "../../constants/Colors";
import { scale } from "react-native-size-matters";
export default EStyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: scale(53),
    // justifyContent: "center",
  },
  text: {
    fontFamily: "Nunito_300Light",
    fontSize: 10,
  },
  link: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 10,
    color: Colors().primary,
  },
  image: { width: scale(130), height: scale(136) },
});
