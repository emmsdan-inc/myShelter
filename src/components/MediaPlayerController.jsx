import React from 'react';
import FlexSpaceBetweenCenter from './Untils';
import Icon from './Icon';
import Colors from '../constants/Colors';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import styles from './style';
import { useDebounce } from 'usehooks-ts';

import useTrackPlayer from '../hooks/useTrackPlayer';

let lastId = 0;
const getRandomArrayId = arr => {
  const yu = Math.floor(Math.random() * (arr.length - 1));
  if (yu !== lastId) {
    lastId = yu;
    return yu;
  }
  return getRandomArrayId(arr);
};
export default function MediaPlayerActions() {
  const [isShuffled, setIsShuffled] = React.useState(false);
  const [isRepeat, setIsRepeat] = React.useState(false);
  const { toggle, state, previous, next, seekTo } = useTrackPlayer();

  const [open, setIsOpen] = React.useState(false);
  const [allowSeek, setAllowSeek] = React.useState(null);
  const debouncedValue = useDebounce(allowSeek, 500);

  const shuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const repeat = async () => {};

  React.useEffect(() => {
    if (state.duration && !open) {
      setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    }
  }, [state.duration]);

  return (
    <FlexSpaceBetweenCenter>
      <Icon
        name={'union'}
        onPress={shuffle}
        size={16}
        color={!isShuffled ? Colors().primary : Colors().blackGlaze}
      />
      <FlexSpaceBetweenCenter>
        <Icon
          name={'back'}
          size={16}
          color={Colors().primary}
          onPress={previous}
        />
        <TouchableOpacity
          onPress={toggle}
          style={{
            backgroundColor: Colors().primary,
            borderRadius: 1234,
            marginHorizontal: 5,
            width: 46,
            height: 46,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon
            name={state.isPlaying ? 'pause-1' : 'play'}
            size={14}
            color={Colors().white}
          />
        </TouchableOpacity>
        <Icon
          name={'forward'}
          size={16}
          color={Colors().primary}
          onPress={next}
        />
      </FlexSpaceBetweenCenter>
      <Icon
        name={'shuffle'}
        onPress={repeat}
        size={16}
        color={!isRepeat ? Colors().primary : Colors().blackGlaze}
      />
    </FlexSpaceBetweenCenter>
  );
}

export const MedialPlayerTimeTracker = () => {
  const [open, setIsOpen] = React.useState(false);
  const [allowSeek, setAllowSeek] = React.useState(null);
  const debouncedValue = useDebounce(allowSeek, 500);
  const { state, seekTo } = useTrackPlayer();

  const seek = time => {
    let percent;
    if (Array.isArray(time)) {
      percent = time[0] * 888;
    } else {
      percent = time * 888;
    }
    setAllowSeek(percent);
  };

  React.useEffect(() => {
    if (state.duration && !open) {
      setIsOpen(true);
    }
  }, [state.duration]);

  React.useEffect(() => {
    if (debouncedValue) {
      seekTo(debouncedValue);
    }
  }, [debouncedValue]);

  return open ? (
    <>
      <Slider
        value={state.percent}
        onValueChange={seek}
        thumbTintColor={Colors().primary}
        thumbStyle={{
          borderColor: Colors().primary,
          borderWidth: 4,
          height: 15,
          width: 15,
        }}
        trackStyle={{ backgroundColor: Colors().primaryWash }}
        minimumTrackTintColor={Colors().primary}
        containerStyle={{ height: 15 }}
      />
      <FlexSpaceBetweenCenter>
        <Text style={styles.timeStamp} numberOfLines={1}>
          {state.currentTime}
        </Text>
        <Text style={styles.timeStamp} numberOfLines={1}>
          {state.timeLeft}
        </Text>
      </FlexSpaceBetweenCenter>
    </>
  ) : (
    <ActivityIndicator size="small" color={Colors().primary} />
  );
};
