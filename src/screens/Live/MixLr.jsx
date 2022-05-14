import React from "react";
import { Image, ScrollView, Text } from "react-native";

import FlexSpaceBetweenCenter, { BaseWrapper } from "../../components/Untils";
import styles from "../MediaPlayer/style";
import Spacer from "../../components/Spacer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TopNavigation } from "../MediaPlayer";
import get from "lodash/get";
import SoundPlayer from "react-native-sound-player";

export default function MixlrMediaPlayerScreen({ route }) {
  const [state, setState] = React.useState({});
  // fetch data from server/store api
  const insets = useSafeAreaInsets();
  React.useEffect(() => {
    if (route.params.broadcast_ids) {
      const broadcast = get(route.params, "broadcasts.0", {});
      const appEmbedUrl = `https://listen.mixlr.com/${get(
        route.params,
        "broadcast_ids.0",
      )}`;
      setState({
        ...route.params,
        ...state,
        ...broadcast,
        appEmbedUrl,
      });
      SoundPlayer.playUrl(appEmbedUrl);
    }
  }, [route.params]);

  const image = get(
    state,
    "profile_image_url",
    get(state, "artwork_url", null),
  );
  return (
    <ScrollView style={{ paddingTop: insets.top }}>
      <BaseWrapper style={{ paddingTop: insets.top }}>
        <TopNavigation />
      </BaseWrapper>
      <Spacer size={15} />

      <BaseWrapper style={{ zIndex: -1 }}>
        <Image
          source={
            state && image
              ? { uri: image }
              : require("../../assets/images/logo.png")
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
        {/*<VolumeController />*/}
        <Spacer size={20} />
        <Spacer size={20} />
      </BaseWrapper>
    </ScrollView>
  );
}
