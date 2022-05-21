import React from 'react';
import { Animated, Dimensions, Image } from 'react-native';
import { scale } from 'react-native-size-matters';
import styles from './style';
import { Text, View } from '../Themed';
const { width } = Dimensions.get('screen');

export default function OnboardingPage({ source, text, style, textStyle }) {
  const [opacity] = React.useState(new Animated.Value(0));
  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={[styles.onboarding]}>
        <Image source={source} style={[styles.image, style]} />
        <View style={{ height: scale(width >= 750 ? 40 : 80) }} />
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </Animated.View>
  );
}
