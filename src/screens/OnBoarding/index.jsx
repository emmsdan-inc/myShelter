
import * as React from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';
import { View } from '../../components/Themed';

import SliderIndicator from '../../components/SliderIndicator';
import { scale } from 'react-native-size-matters';
import Routes from '../../navigation/Routes';
import styles from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import data from './data';
import OnboardingPage from '../../components/Onboarding/OnboardingPage';

import { rcFirstTimeUseSelector } from '../../store/redux/states';
import useReduxState from '../../hooks/useReduxState';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const Separator = () => <View style={styles.itemSeparator} />;
const LeftSwipeActions = (next) =>  () => {
  next();
  return (
    <View
      style={{ flex: 1, backgroundColor: '#ccffbd', justifyContent: 'center' }}
    >
      <Text
        style={{
          color: '#40394a',
          paddingHorizontal: 10,
          fontWeight: '600',
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
      >
        Bookmark
      </Text>
    </View>
  );
};
const rightSwipeActions = (prev) => () => {
  prev();
  return (
    <View
      style={{
        backgroundColor: '#ff8303',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      <Text
        style={{
          color: '#1b1a17',
          paddingHorizontal: 10,
          fontWeight: '600',
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
      >
        Delete
      </Text>
    </View>
  );
};
const swipeFromLeftOpen = () => {
  alert('Swipe from left');
};
const swipeFromRightOpen = () => {
  alert('Swipe from right');
};

export default function Index({ navigation }) {
  const [isFirstTimeUse] = useReduxState(rcFirstTimeUseSelector);
  const insets = useSafeAreaInsets();
  
  const [active, setActive] = React.useState(0);
  const colors = {
    0: '#A8518A',
    1: '#00AFEF',
    2: '#A8CF45',
  };
  
  React.useEffect(() => {
    if (isFirstTimeUse) {
      // navigation.navigate(Routes.Login);
      return;
    }
  }, [isFirstTimeUse]);
  
  function next() {
    console.log('next', { active });
    if (active >= 2) {
      // setIsFirstTimeUse("true");
      navigation.navigate(Routes.Login);
    }
    setActive(active <= 1 ? active + 1 : 2);
  }
  function prev() {
    console.log('prev', { active });
    setActive(active >= 1 ? active - 1 : 0);
  }
  const { width, height } = Dimensions.get('screen');
  
  return (
    <Swipeable
      renderLeftActions={LeftSwipeActions(prev)}
      renderRightActions={rightSwipeActions(next)}
      onSwipeableRightOpen={swipeFromRightOpen}
      onSwipeableLeftOpen={swipeFromLeftOpen}
    >
      <View
        style={[
          {
            paddingHorizontal: 30,
            paddingVertical: 20,
            height: heightPercentageToDP('100%'),
          },
        ]}
      >
        <View style={[styles.container, { paddingTop: insets.top }]}>
          {data.map((data, index) =>
            index === active ? (
              <OnboardingPage {...data} key={data.text + index} />
            ) : null,
          )}
          <View style={[{ paddingTop: scale(100) }]} />
          <View style={{ height: scale(width >= 750 ? 70 : 0) }} />
          
          <View style={styles.sliderContainer}>
            <SliderIndicator color={colors[active]} active={active === 0} />
            <SliderIndicator color={colors[active]} active={active === 1} />
            <SliderIndicator color={colors[active]} active={active >= 2} />
          </View>
        </View>
      </View>
    </Swipeable>
  );
}
