import * as React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
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
import Icon from '../../components/Icon';
import FlexSpaceBetweenCenter, { FlexCenter } from '../../components/Untils';

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
    if (active >= 2) {
      // setIsFirstTimeUse("true");
      navigation.navigate(Routes.Login);
    }
    setActive(active <= 1 ? active + 1 : 2);
  }
  function prev() {
    setActive(active >= 1 ? active - 1 : 0);
  }
  const { width } = Dimensions.get('screen');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {data.map((data, index) =>
        index === active ? (
          <OnboardingPage {...data} key={data.text + index} />
        ) : null,
      )}
      <View style={[{ paddingTop: scale(100) }]} />
      <View style={{ height: scale(width >= 750 ? 70 : 0) }} />

      <TouchableOpacity
        style={[
          styles.navigator,
          {
            right: 0,
          },
        ]}
        onPress={next}
      />
      <TouchableOpacity
        style={[
          styles.sliderContainer,
          styles.navigator,
          {
            left: 0,
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            paddingLeft: scale(20),
          },
        ]}
        onPress={prev}
      />

      <View
        style={[
          { width, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: scale(20) },
        ]}
      >
        <TouchableOpacity         onPress={prev}
        >
          {
            active !== 0 && <Icon name="angle-left" size={scale(30)} color={colors[active]} />
          }
        </TouchableOpacity>
        <View style={[styles.sliderContainer]}>
          <SliderIndicator color={colors[active]} active={active === 0} />
          <SliderIndicator color={colors[active]} active={active === 1} />
          <SliderIndicator color={colors[active]} active={active >= 2} />
        </View>
        <TouchableOpacity         onPress={next}
        >
          <Icon name="angle-right" size={scale(30)} color={colors[active]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
