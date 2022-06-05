import React from 'react';
import VideoPlaceholder from './VideoPlaceholder';
import MixlrPlaceholder from './MixlrPlaceholder';
import Colors from '../constants/Colors';
import { getLiveEventService } from '../services/media';
import useReduxState from '../hooks/useReduxState';
import { rcMediaLiveEventAtom } from '../store/redux/states';
import Routes from '../navigation/Routes';
import { getMixlrValues, getYoutubeValues } from '../shared/helpers/func';
import { get } from 'lodash';

export default function LiveEventPlaceholders({ navigation }) {
  // const navigation = useNavigation();
  const [liveEvent, setLiveEvent] = useReduxState(rcMediaLiveEventAtom);

  console.log(liveEvent?.youtube);
  const [isLoading, setIsLoading] = React.useState(true);
  const offlineImage =
    'https://via.placeholder.com/300x200.png?text=\n\nWe+are+Currently+offline.+++';
  const color = Colors().primary2;
  React.useEffect(() => {
    const now = new Date().getTime();
    const currentTime = new Date(liveEvent.lastCheck)?.getTime();
    const distance = (currentTime - now) / 1000;
    const minutes = distance / 60;
    if (liveEvent.lastCheck && minutes > -10) {
      setIsLoading(false);
      return;
    }
    getLiveEventService().then(async res => {
      setIsLoading(false);
      await setLiveEvent({
        mixlr: getMixlrValues(res.mixlr),
        youtube: getYoutubeValues(res.youtube),
        lastCheck: new Date().toISOString(),
      });
    });
  }, []);

  return (
    <>
      <VideoPlaceholder
        type="sm"
        uri={liveEvent.youtube ? liveEvent.youtube?.thumbnail : offlineImage}
        pressable={get(liveEvent.youtube, 'publishTime')}
        video={liveEvent.youtube}
        isLive={liveEvent.youtube}
        isLoading={isLoading}
      />
      <MixlrPlaceholder
        mixlr={liveEvent.mixlr}
        color={get(liveEvent.mixlr, 'is_live') ? null : color}
        navigation={navigation}
        pressable={get(liveEvent.mixlr, 'is_live')}
        isLoading={isLoading}
      />
    </>
  );
}

export const getLiveEvent = (event, navigation) => {
  return {
    live: event?.youtube || event?.mixlr,
    go: () => {
      if (event && event.youtube) {
        navigation.navigate(Routes.LiveVideo, {
          params: event.youtube,
          screen: Routes.LiveVideo,
        });
      } else if (event && event.mixlr) {
        navigation.navigate(Routes.MixlrMediaPlayer, event.mixlr);
      }
    },
  };
};
