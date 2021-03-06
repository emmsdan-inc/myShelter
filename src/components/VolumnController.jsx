import React from "react";
import Colors from "../constants/Colors";
import FlexSpaceBetweenCenter from "./Untils";
import Icon from "./Icon";
import { Slider } from "@miblanchard/react-native-slider";
import { Dimensions } from "react-native";
import useReduxState from "../hooks/useReduxState";
import {
  rcMediaPlayObjectAtom,
  rcMediaPlaybackStatusUpdateAtom,
} from "../store/redux/states";
const { width } = Dimensions.get("screen");

export default function VolumeController() {
  const [instance] = useReduxState(rcMediaPlaybackStatusUpdateAtom);
  const [playStatus] = useReduxState(rcMediaPlayObjectAtom);
  const [isMuted, setIsMuted] = React.useState(false);

  const mutedColor = isMuted ? Colors().primary : Colors().blackGlaze;
  const mutedColorWash = isMuted ? Colors().primaryWash : Colors().blackWash;

  const handleVolumeChange = (value) => {
    console.log({ value: value });
    instance.setVolumeAsync(value);
  };
  const handleMuteChange = () => {
    instance.setIsMutedAsync(!isMuted);
    setIsMuted(!isMuted);
  };
  return (
    <FlexSpaceBetweenCenter>
      <Icon
        name={isMuted ? "mutevolumn" : "lowvolumn"}
        onPress={handleMuteChange}
        color={mutedColor}
      />

      <Slider
        value={playStatus.volume}
        onValueChange={handleVolumeChange}
        thumbTintColor={Colors().background}
        thumbStyle={{
          borderColor: mutedColor,
          borderWidth: 4,
          height: 15,
          width: 15,
        }}
        trackStyle={{ backgroundColor: mutedColorWash }}
        minimumTrackTintColor={mutedColor}
        containerStyle={{ height: 15, width: width - 90 }}
        disabled={isMuted}
      />
      <Icon name={"highvolumn"} color={mutedColor} />
    </FlexSpaceBetweenCenter>
  );
}
