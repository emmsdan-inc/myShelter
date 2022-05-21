import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../navigation/Routes';
import Colors from '../../constants/Colors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function AudioImageCard({
  uri,
  onPress,
  media,
  playlistIndex,
  playlist,
}) {
  const navigation = useNavigation();
  const navigate = () => {
    if (onPress) onPress();
    navigation.navigate(Routes.MediaPlayer, {
      ...(media || {}),
      playlistIndex,
      playlist,
    });
  };
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={navigate}>
      {uri ? (
        <Image source={{ uri }} style={styles.audioImageCard} />
      ) : (
        <View
          style={[
            styles.audioImageCard,
            {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors().primary,
              paddingHorizontal: 20,
            },
          ]}
        >
          <Text
            style={{ textAlign: 'center', color: Colors().background }}
            numberOfLines={3}
            allowFontScaling
            adjustsFontSizeToFit
          >
            {media.title || media.name}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
