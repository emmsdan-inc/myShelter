import EStyleSheet from "react-native-extended-stylesheet";
import Colors from "../../constants/Colors";
import { scale } from "react-native-size-matters";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
export default EStyleSheet.create({
  container: {
    height: scale(48),
    borderRadius: scale(15),
    backgroundColor: Colors().button,
    justifyContent: "center",
    alignItems: "center",
  },
  mdContainer: {
    height: scale(48),
    borderRadius: scale(10),
    backgroundColor: Colors().button,
    justifyContent: "center",
    alignItems: "center",
  },
  withIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  mdText: {
    fontFamily: "Nunito_600SemiBold",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: scale(width >= 750 ? 12 : 16),
    color: Colors().background,
  },
  text: {
    fontFamily: "Nunito_700Bold",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: scale(width >= 750 ? 16 : 18),
    lineHeight: scale(24),
    textAlign: "center",
    color: Colors().background,
  },
  floatingButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    position: "absolute",
    bottom: 0,
    right: 20,
    resizeMode: "contain",
  },
});
