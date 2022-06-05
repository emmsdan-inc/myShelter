import React from 'react';
import { Animated, Dimensions, Image, ImageBackground } from 'react-native';
import { scale } from 'react-native-size-matters';
import styles from './style';
import { Text, View } from '../Themed';
import Colors from '../../constants/Colors';
const { width, height } = Dimensions.get('screen');

export default function OnboardingPage({
  source,
  text,
  style,
  textStyle,
  color,
  back = false,
}) {
  const [opacity] = React.useState(new Animated.Value(0.5));

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <Animated.View style={[{ opacity, zIndex: -1, flex: 1 }]}>
      <ImageBackground source={source} style={[styles.image]} />
      <Text style={[styles.text, textStyle, { color }]}>{text}</Text>
      <View
        style={{
          height,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: Colors().blackGlaze,
        }}
      />
      {/*</ImageBackground>*/}
    </Animated.View>
  );
}
