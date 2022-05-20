import EStyleSheet from "react-native-extended-stylesheet";
import Colors from "../../constants/Colors";
import { scale } from "react-native-size-matters";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");
export default EStyleSheet.create({
  container: {
    backgroundColor: Colors().background,
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    // justifyContent: "center",
  },
  footer: {
    width: wp("50%"),
    position: "absolute",
    bottom: scale(width >= 750 ? 10 : 20),
  },
  horizontalContainer: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    width: "100%",
    height: scale(40),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: Colors().primaryWash,
  },
  heading: {
    color: Colors().blackGlaze, // global variable $textColor
    fontFamily: "nunito",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: scale(12),
    lineHeight: scale(17),
  },
  heading2: {
    color: Colors().primary, // global variable $textColor
    fontFamily: "Nunito_700Bold",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: scale(12),
    lineHeight: scale(17),
  },
  menuText: {
    color: Colors().blackGlaze, // global variable $textColor
    fontFamily: "nunito",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: scale(16),
    lineHeight: scale(17),
  },
  image: {
    width: scale(238),
    height: scale(170),
  },
  navigator: {
    width: scale(100),
    height: "100%",
    position: "absolute", // 80% of screen width
  },
  text: {
    color: Colors().blackGlaze, // global variable $textColor
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: scale(15),
    lineHeight: scale(24),
    textAlign: "center",
    width: scale(280),
  },
  footerText: {
    color: Colors().darkBlueBlack, // global variable $textColor
    fontFamily: "nunito",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: scale(11),
    lineHeight: scale(14),
    opacity: 0.3,
  },
});
