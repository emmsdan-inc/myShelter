import EStyleSheet from "react-native-extended-stylesheet";
import Colors from "../constants/Colors";
import { scale } from "react-native-size-matters";

export default EStyleSheet.create({
  baseWrapper: {
    paddingHorizontal: scale(20),
  },

  timeStamp: {
    fontSize: scale(12),
    color: Colors().blackGlaze,
    fontFamily: "nunito",
    fontStyle: "normal",
  },
  shadowBottom: {
    shadowOffset: {
      width: scale(0.7),
      height: -scale(1),
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    shadowColor: Colors().blackShadow,
  },
});
