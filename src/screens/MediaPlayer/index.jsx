import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import FlexSpaceBetweenCenter, { BaseWrapper } from '../../components/Untils';
import styles from './style';
import Icon from '../../components/Icon';
import Colors from '../../constants/Colors';
import Spacer from '../../components/Spacer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AudioDropdown from '../../components/Audio/Dropdown';
import { useNavigation } from '@react-navigation/native';
import MediaPlayerActions, {
  MedialPlayerTimeTracker,
} from '../../components/MediaPlayerController';
import useGetMedia from '../../hooks/useGetMedia';
import useTrackPlayer from '../../hooks/useTrackPlayer';
import { useFocusEffect } from '@react-navigation/native';
import useReduxState from '../../hooks/useReduxState';
import {
  rcNavigatorAtom,
  rcOpenMiniPlayerAtom,
} from '../../store/redux/states';

export const TopNavigation = props => {
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigation();

  return (
    <View style={{ zIndex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Icon
          name="backarrow"
          onPress={() => {
            try {
              navigation.goBack();
              // navigation.navigate(Routes.DiscoverHome)
            } catch (error) {
              // navigation.goBack();
              console.error(error);
            }
          }}
          size={16}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.rotate}
          onPress={() => setOpen(!open)}
        >
          <Icon name="dot-3" size={16} color={Colors().primary} />
        </TouchableOpacity>
      </View>
      <AudioDropdown
        isVisible={open}
        onPress={() => setOpen(!open)}
        {...props}
      />
    </View>
  );
};

export const LikeMedia = ({ isLiked, id }) => {
  const [liked, setIsLiked] = React.useState(isLiked);
  return (
    <Icon
      name={'heart'}
      color={liked ? Colors().primary : Colors().blackGlaze}
      onPress={() => setIsLiked(!liked)}
    />
  );
};

export default function MediaPlayerScreen({ navigation, route }) {
  const routeInfo = route.params || {};
  // fetch data from server/store api
  const [media, setMedia] = useGetMedia(routeInfo.id);
  const [openMiniPlayer, setOpenMiniPlayer] =
    useReduxState(rcOpenMiniPlayerAtom);
  const { addPlaylist, resetAndPlay, track, play } = useTrackPlayer();

  const insets = useSafeAreaInsets();
  React.useEffect(() => {
    if (route.params.id !== media.id) {
      setMedia(route.params.id);
    }
  }, [route.params]);

  useFocusEffect(
    React.useCallback(() => {
      setOpenMiniPlayer(!openMiniPlayer).then(r => {});
      return () => {
        setOpenMiniPlayer(!openMiniPlayer).then(r => {});
      };
    }, [route.params]),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (!media.dataIsLoading && media.url) {
        resetAndPlay(media, true).then(async () => {
          if (route.params.playlist && route.params.playlist.length > 0) {
            route.params.playlist.splice(route.params.playlistIndex, 1);
            await addPlaylist(route.params.playlist);
            await play();
          }
        });
      }
    }, [media.dataIsLoading]),
  );

  return (
    <ScrollView style={{ paddingTop: insets.top }}>
      <BaseWrapper style={{ paddingTop: insets.top }}>
        <TopNavigation />
      </BaseWrapper>
      <Spacer size={15} />
      {media.dataIsLoading || !track ? (
        <ActivityIndicator size="large" color={Colors().primary} />
      ) : (
        <BaseWrapper style={{ zIndex: -1 }}>
          <Image
            source={
              track && track.artwork
                ? { uri: track.artwork }
                : require('../../../assets/images/logo.png')
            }
            style={{ width: '100%', height: 315, borderRadius: 15 }}
          />
          <Spacer size={20} />
          <Text style={styles.title} numberOfLines={3}>
            {track.title}
          </Text>
          <Spacer size={2} />
          <FlexSpaceBetweenCenter>
            <Text style={styles.author} numberOfLines={1}>
              {track.author}
            </Text>
            <LikeMedia id={'sdfdsfsd'} />
          </FlexSpaceBetweenCenter>

          <Spacer size={20} />
          <MedialPlayerTimeTracker />
          <Spacer size={10} />
          <MediaPlayerActions />
          <Spacer size={20} />
          {/*<VolumeController />*/}
          <Spacer size={20} />
          <Spacer size={20} />
        </BaseWrapper>
      )}
    </ScrollView>
  );
}
