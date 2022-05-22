import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Colors from '../constants/Colors';
import ImageIcon from './ImageIcon';
import Routes from '../navigation/Routes';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function MixlrPlaceholder({
  active,
  color,
  type = 'sm',
  mixlr,
  navigation,
  isLoading,
  pressable,
}) {
  const source = { uri: 'http://emmsdan.com' };
  const imageSize =
    type === 'sm'
      ? { width: scale(120), height: scale(112) }
      : { width: '98%', height: scale(192) };
  const size = type === 'sm' ? 80 : 120;
  return isLoading ? (
    <View style={{ marginHorizontal: scale(5), marginVertical: scale(5) }}>
      <SkeletonPlaceholder direction={'left'}>
        <SkeletonPlaceholder.Item {...imageSize} borderRadius={scale(10)} />
      </SkeletonPlaceholder>
    </View>
  ) : (
    <ImageBackground
      source={source}
      style={[
        imageSize,
        {
          borderRadius: scale(10),
          marginHorizontal: scale(5),
          marginVertical: scale(5),
          backgroundColor: color || Colors().error,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <ImageIcon
        name={'mixlrWhite'}
        size={size}
        onPress={() =>
          pressable ? navigation.navigate(Routes.MixlrMediaPlayer, mixlr) : null
        }
      />
    </ImageBackground>
  );
}
