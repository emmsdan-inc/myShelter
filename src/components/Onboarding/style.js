import EStyleSheet from "react-native-extended-stylesheet";
import Colors from "../../constants/Colors";
import { scale } from "react-native-size-matters";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
export default EStyleSheet.create({
  container: {
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  onboarding: {
    width,
    height: hp("40%"),
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: scale(238),
    height: scale(170),
  },
  text: {
    color: Colors().blackGlaze, // global variable $textColor
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: scale(width >= 750 ? 15 : 20),
    lineHeight: scale(24),
    textAlign: "center",
    width: scale(220),
  },
});
