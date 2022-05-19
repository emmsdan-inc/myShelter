import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity } from "react-native";

import FlexSpaceBetweenCenter, { BaseWrapper } from "../../components/Untils";
import styles from "../MediaPlayer/style";
import Spacer from "../../components/Spacer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TopNavigation } from "../MediaPlayer";
import get from "lodash/get";
import SoundPlayer from "react-native-sound-player";
import Colors from "../../constants/Colors";
import Icon from "../../components/Icon";
import { useInterval } from "usehooks-ts";
import { View } from "../../components/Themed";
import { FloatingButton } from "../../components/Button";

export default function MixlrMediaPlayerScreen({ route }) {
  const [state, setState] = React.useState({});
  const [playing, setPlaying] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  // fetch data from server/store api
  const insets = useSafeAreaInsets();
  React.useEffect(() => {
    if (route.params.broadcast_ids) {
      const broadcast = get(route.params, "broadcasts.0", {});
      const appEmbedUrl = `https://listen.mixlr.com/${get(
        route.params,
        "broadcast_ids.0"
      )}`;
      setState({
        ...route.params,
        ...state,
        ...broadcast,
        appEmbedUrl,
      });
      SoundPlayer.playUrl(appEmbedUrl);
      setLoading(false)
    }
  }, [route.params]);

  async function toggle () {
    if (playing) {
      await SoundPlayer.pause()
      setPlaying(false)
    }  else  {
      await SoundPlayer.play()
      setPlaying(true)
    }
  }
  
  const image = get(
    state,
    "profile_image_url",
    get(state, "artwork_url", null)
  );
  return (
    loading ? <View style={{ flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size={40} color={Colors().primary} />
      </View>:
    <>
      <FloatingButton onPress={toggle} style={{ bottom: insets.bottom + 20 }}>
        <Icon
          name={playing ? "pause-1" : "play"}
          size={14}
          color={Colors().background}
        />
      </FloatingButton>
    <ScrollView style={{ paddingTop: insets.top }} showsVerticalScrollIndicator={false}>
      <BaseWrapper style={{ paddingTop: insets.top }}>
        <TopNavigation />
      </BaseWrapper>
      
      <Spacer size={15} />
      <BaseWrapper style={{ zIndex: -1 }}>
        <Image
          source={
            state && image
              ? { uri: image }
              : require("../../../assets/images/logo.png")
          }
          style={{ width: "100%", height: 315, borderRadius: 15 }}
        />
        <Spacer size={20} />
        <Text style={styles.title} numberOfLines={3}>
          {state.about_me}
        </Text>
        <Spacer size={2} />
        <FlexSpaceBetweenCenter>
          <Text style={styles.author} numberOfLines={13}>
            {state.about_me}
          </Text>
        </FlexSpaceBetweenCenter>

        <Spacer size={20} />
        <Spacer size={20} />
  
        <Spacer size={20} />
        <Spacer size={20} />
      </BaseWrapper>
    </ScrollView>
    </>
  );
}
