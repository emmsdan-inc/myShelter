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
import {
  rcMediaCurrentlyPlayingSelector,
  rcMediaObjectAtom,
  rcMediaPlaybackStatusUpdateAtom,
  rcMediaPlayObjectAtom,
} from "../../store/recoil/media";
import { Audio } from "expo-av";
import Routes from "../../navigation/Routes";

export default function MediaPlayer() {
  const [height] = useRecoilState(rcBottomTabHeightAtom);
  const [open] = useRecoilState(rcOpenMiniPlayerAtom);
  const [, setPlaybackInstance] = useRecoilState(
    rcMediaPlaybackStatusUpdateAtom,
  );
  const [playStatus, onPlaybackStatusUpdate] = useRecoilState(
    rcMediaPlayObjectAtom,
  );
  const [currentlyPlaying, setCurrentlyPlaying] = useRecoilState(
    rcMediaCurrentlyPlayingSelector,
  );
  const [media] = useRecoilState(rcMediaObjectAtom);
  const [navigation] = useRecoilState(rcNavigatorAtom);

  // const [open, setOpen] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const uri = null;
  const title = "The Rise of a Great Army Pst. Ayoola Jolayemi";
  const author = "Pst. Ayoola Jolayemi";
  const source = uri ? { uri } : require("../../assets/images/logo.png");

  // console.log({playStatus, media}, "playStatus");
  const loadAudio = async uri => {
    try {
      if (currentlyPlaying.uri === uri) return;
      console.log(uri, "9876-098ujh", "playStatus");
      const playbackInstance = new Audio.Sound();
      const source = { uri };
      const status = {
        shouldPlay: isPlaying,
        volume: 1.0,
      };
      playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      setPlaybackInstance(playbackInstance);
      // setCurrentlyPlaying(media);
      console.log("got here");
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    if (media.url) {
      console.log("sxdfsdfds", "send to player");
      loadAudio(media.url);
    }
  }, [media]);
  const onPress = () => {
    navigation.navigate(Routes.Discover, {
      screen: Routes.MediaPlayer,
      params: media || {},
    });
  };
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
            name={isPlaying ? "pause-1" : "play"}
            size={15}
            color={Colors().primary}
            onPress={() => setIsPlaying(!isPlaying)}
          />
        </FlexSpaceBetweenCenter>
      </FlexSpaceBetweenCenter>
    </View>
  ) : null;
}
