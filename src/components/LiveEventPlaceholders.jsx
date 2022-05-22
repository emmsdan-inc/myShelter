import React from 'react';
import VideoPlaceholder from './VideoPlaceholder';
import MixlrPlaceholder from './MixlrPlaceholder';
import Colors from '../constants/Colors';
import { getLiveEventService } from '../services/media';
import useReduxState from '../hooks/useReduxState';
import { rcMediaLiveEventAtom } from '../store/redux/states';
import Routes from "../navigation/Routes";

export default function LiveEventPlaceholders({ navigation }) {
  // const navigation = useNavigation();
  const [liveEvent, setLiveEvent] = useReduxState(rcMediaLiveEventAtom);

  const [isLoading, setIsLoading] = React.useState(true);
  const offlineImage =
    'https://via.placeholder.com/300x200.png?text=\n\nWe+are+Currently+offline.+++';
  const color = Colors().primary2;
  React.useEffect(() => {
    if (
      liveEvent.lastCheck &&
      new Date(liveEvent.lastCheck)?.getTime() + 1000 * 60 * 15 >
        new Date().getTime()
    ) {
      setIsLoading(false);
      return;
    }
    getLiveEventService().then(async res => {
      setIsLoading(false);
      await setLiveEvent({ ...res, lastCheck: new Date().toISOString() });
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

export const getLiveEvent = (event, navigation) => {
  return {
    live: event?.youtube || event?.mixlr,
    go: ()=> {
      if (event && event.youtube) {
        navigation.navigate(Routes.LiveVideo, {
          params: event.youtube,
          screen: Routes.LiveVideo,
        })
      } else if (event && event.mixlr) {
        navigation.navigate(Routes.MixlrMediaPlayer, event.mixlr);
      }
    }
  }
};
