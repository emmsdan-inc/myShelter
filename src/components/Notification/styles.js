import EStyleSheet from "react-native-extended-stylesheet";
import { scale } from "react-native-size-matters";
import Colors from "../../constants/Colors";

export default EStyleSheet.create({
  container: {
    padding: scale(16),
    borderRadius: scale(4),
  },
  error: {
    backgroundColor: Colors().error,
  },
  success: {
    backgroundColor: Colors().success,
  },
  warning: {
    backgroundColor: Colors().warning,
  },
  notification: {
    backgroundColor: Colors().notification,
  },
});

export const textStyles = EStyleSheet.create({
  error: {
    color: Colors().background,
  },
  success: {
    color: Colors().successDarker,
  },
  warning: {
    color: Colors().warningDarker,
  },
  notification: {
    color: Colors().background,
  },
  text: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: scale(11),
  },
});
