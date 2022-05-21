import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import FlexSpaceBetweenCenter from '../Untils';
import Icon from '../Icon';
import Colors from '../../constants/Colors';
import Spacer from '../Spacer';
import { LikeMedia } from '../../screens/MediaPlayer';

import Routes from '../../navigation/Routes';
import useTrackPlayer from '../../hooks/useTrackPlayer';
import get from 'lodash/get';
import useReduxState from '../../hooks/useReduxState';
import {
  rcBottomTabHeightAtom,
  rcNavigatorAtom,
  rcOpenMiniPlayerAtom,
} from '../../store/redux/states';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function MediaPlayer({ navigation }) {
  const [bottom] = useReduxState(rcBottomTabHeightAtom);
  const { state, toggle, track, getCurrentTrack } = useTrackPlayer();
  const [open, setOpen] = React.useState(false);
  // const [navigation] = useReduxState(rcNavigatorAtom);
  const [openA] = useReduxState(rcOpenMiniPlayerAtom);
  const insets = useSafeAreaInsets();

  const uri = get(track, 'artwork', get(track, 'thumbnail_url', null));
  const title = get(track, 'title', '');
  const author = get(track, 'artist', '');
  const source = uri ? { uri } : require('../../../assets/images/logo.png');

  React.useEffect(() => {
    if (state.isPlaying || state.isPaused) {
      setOpen(
        !(
          !state.isPlaying &&
          !state.isPaused &&
          !state.position &&
          !state.buffered
        ) && openA,
      );
    }
  }, [state]);
  React.useEffect(() => {
    getCurrentTrack();
  }, [state.position]);
  const onPress = () => {
    navigation.navigate(Routes.MediaPlayer, {});
  };
  return open ? (
    <View
      style={[
        styles.miniPlayerContainer,
        {
          bottom,
          marginBottom: -bottom / 4.5,
          width: widthPercentageToDP('100%'),
        },
      ]}
    >
      <FlexSpaceBetweenCenter style={[{ width: widthPercentageToDP('88%') }]}>
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
          <LikeMedia id={'dsfsd'} />
          <Spacer size={4} />
          <Icon
            name={state.isPlaying ? 'pause-1' : 'play'}
            size={15}
            color={Colors().primary}
            onPress={toggle}
          />
        </FlexSpaceBetweenCenter>
      </FlexSpaceBetweenCenter>
    </View>
  ) : null;
}
