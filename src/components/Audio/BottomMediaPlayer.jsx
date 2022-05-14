import React from "react";
import { useRecoilState } from "recoil";
import {
  rcBottomTabHeightAtom,
  rcNavigatorAtom,
  rcOpenMiniPlayerAtom,
} from "../../store/recoil/general";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import FlexSpaceBetweenCenter from "../Untils";
import Icon from "../Icon";
import Colors from "../../constants/Colors";
import Spacer from "../Spacer";
import { LikeMedia } from "../../screens/MediaPlayer";

import Routes from "../../navigation/Routes";
import useTrackPlayer from "../../hooks/useTrackPlayer";
import get from "lodash/get";
export default function MediaPlayer() {
  return null
  const [height] = useRecoilState(rcBottomTabHeightAtom);
  const { state, toggle, track, getCurrentTrack } = useTrackPlayer();
  const [open, setOpen] = React.useState(false);
  const [navigation] = useRecoilState(rcNavigatorAtom);
  const [openA] = useRecoilState(rcOpenMiniPlayerAtom);

  const uri = get(track, "artwork", get(track, "thumbnail_url", null));
  const title = get(track, "title", "");
  const author = get(track, "artist", "");
  const source = uri ? { uri } : require("../../assets/images/logo.png");
  
  React.useEffect(() => {
    if (state.isPlaying || state.isPaused) {
      setOpen(!(!state.isPlaying && !state.isPaused && !state.position && !state.buffered) && openA);
    }
  }, [state]);
  React.useEffect(() => {
    getCurrentTrack();
  }, [state.position]);
  const onPress = () => {
    navigation.navigate(Routes.MediaPlayer, {});
  };
  console.log("height", { open, height });
  return null
  return open ? (
    <View style={[styles.miniPlayerContainer, { bottom: height }]}>
      <FlexSpaceBetweenCenter style={[{ width: "100%" }]}>
        <Image source={source} style={styles.miniPlayerIcon} />
        <TouchableOpacity onPress={onPress} style={styles.audioListCardContent}>
          <Text style={styles.miniPlayerTitle} numberOfLines={1}>
            {title}
          </Text>
          <Text numberOfLines={1} style={[styles.miniPlayerAuthor]}>
            {author}
          </Text>
        </TouchableOpacity>
        <FlexSpaceBetweenCenter style={{ width: 40 }}>
          <LikeMedia id={"dsfsd"} />
          <Spacer size={4} />
          <Icon
            name={state.isPlaying ? "pause-1" : "play"}
            size={15}
            color={Colors().primary}
            onPress={toggle}
          />
        </FlexSpaceBetweenCenter>
      </FlexSpaceBetweenCenter>
    </View>
  ) : null;
}
