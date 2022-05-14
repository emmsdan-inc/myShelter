import React from "react";
import VideoPlaceholder from "./VideoPlaceholder";
import MixlrPlaceholder from "./MixlrPlaceholder";
import Colors from "../constants/Colors";
import { useRecoilState } from "recoil";
import { rcMediaLiveEventAtom } from "../store/recoil/media";
import { getLiveEventService } from "../services/media";

export default function LiveEventPlaceholders({ navigation }) {
  // const navigation = useNavigation();
  const [liveEvent, setLiveEvent] = useRecoilState(rcMediaLiveEventAtom);
  const [isLoading, setIsLoading] = React.useState(true);
  const offlineImage =
    "https://via.placeholder.com/300x200.png?text=\n\nWe+are+Currently+offline.+++";
  const color = Colors().primary2;
  React.useEffect(() => {
    if (
      liveEvent.lastCheck &&
      liveEvent.lastCheck?.getTime() + 1000 * 60 * 15 > new Date().getTime()
    ) {
      return;
    }
    getLiveEventService().then(res => {
      setIsLoading(false);
      setLiveEvent({ ...res, lastCheck: new Date() });
    });
  }, []);

  return (
    <>
      <VideoPlaceholder
        type="sm"
        uri={liveEvent.youtube ? liveEvent.youtube?.thumbnail : offlineImage}
        pressable={liveEvent.youtube}
        video={liveEvent.youtube}
        isLive={liveEvent.youtube}
        isLoading={isLoading}
      />
      <MixlrPlaceholder
        mixlr={liveEvent.mixlr}
        pressable={liveEvent.mixlr}
        color={liveEvent.mixlr ? null : color}
        navigation={navigation}
        isLoading={isLoading}
      />
    </>
  );
}
