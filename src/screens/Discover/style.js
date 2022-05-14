import EStyleSheet from "react-native-extended-stylesheet";
import Colors from "../../constants/Colors";
import { scale } from "react-native-size-matters";
import { Dimensions } from "react-native";
const { height } = Dimensions.get("screen");
export default EStyleSheet.create({
  title: {
    fontSize: scale(16),
    color: Colors().black,
    fontFamily: "Nunito_600SemiBold",
    fontStyle: "normal",
  },
  seeMoreText: {
    fontSize: scale(12),
    color: Colors().primary,
    fontFamily: "nunito",
    fontStyle: "normal",
  },
  flatList: {
    height: height - scale(250),
    paddingBottom: scale(120),
  },
});
