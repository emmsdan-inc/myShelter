import React from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-matters";
import Icon from "./Icon";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import Routes from "../navigation/Routes";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Spacer from "./Spacer";

export default function VideoPlaceholder({
  uri,
  type = "md",
  pressable,
  video,
  isLoading,
}) {
  const navigation = useNavigation();
  const source = { uri };
  const imageSize =
    type === "sm"
      ? { width: scale(185), height: scale(112) }
      : { width: "98%", height: scale(192) };
  const size = type === "sm" ? 30 : 48;
  const color = pressable ? Colors().background : Colors().primary2;
  return isLoading ? (
    <View style={{ marginHorizontal: scale(5), marginVertical: scale(5) }}>
      <SkeletonPlaceholder direction={"left"}>
        <SkeletonPlaceholder.Item {...imageSize} borderRadius={scale(10)} />
      </SkeletonPlaceholder>
    </View>
  ) : (
    <View style={{ borderRadius: scale(25), overflow: "hidden" }}>
      <ImageBackground
        source={source}
        style={[
          imageSize,
          {
            borderRadius: scale(25),
            marginHorizontal: scale(5),
            marginVertical: scale(5),
            backgroundColor: Colors().primary2,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 5000,
            borderColor: color,
            width: 60,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() =>
            navigation.navigate(Routes.LiveVideo, {
              params: video,
              screen: Routes.LiveVideo,
            })
          }
          disabled={!pressable}
        >
          <Icon name={"play"} size={size} color={color} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
