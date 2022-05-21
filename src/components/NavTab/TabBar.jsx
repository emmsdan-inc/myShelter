import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import styles from './styles';
import Icon from '../Icon';
import FlexSpaceBetweenCenter, { BaseWrapper, FlexCenter } from '../Untils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from '../Themed';
import MediaPlayer from '../Audio/BottomMediaPlayer';

const TabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const bottom =
    Platform.OS !== 'ios'
      ? { paddingBottom: insets.bottom + 20 }
      : { paddingBottom: insets.bottom + 5 };

  return (
    <BaseWrapper style={styles.tabShadow}>
      <MediaPlayer navigation={navigation} />
      <FlexSpaceBetweenCenter style={[bottom]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented && navigation?.navigate) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const getIconName = name => {
            const icon = {
              Root: 'Home',
              Give: 'wallet',
            };
            return icon[name] || name;
          };
          const iconName = getIconName(route.name).toLowerCase();
          // hide header for specific route
          // const hideOnRoute = ['Discovery', 'Media']
          // drawer.setOptions({
          //   headerShown: !hideOnRoute.includes(route.name),
          // })
          return route.name.startsWith('__$') ? null : (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tab, !isFocused ? styles.inactiveTab : {}]}
            >
              <Icon name={iconName} color={Colors().primary} size={24} />
            </TouchableOpacity>
          );
        })}
      </FlexSpaceBetweenCenter>
    </BaseWrapper>
  );
};

export default TabBar;

export const TopHeader = ({ title, back, rightContent }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <FlexCenter
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: insets.top + 10,
        paddingLeft: 10,
      }}
    >
      <Icon
        name="backarrow"
        onPress={() => {
          try {
            if (back) {
              navigation?.navigate(back);
              return;
            }
            navigation?.goBack();
          } catch (error) {
            console.error(error);
          }
        }}
        size={16}
      />
      <FlexSpaceBetweenCenter
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Text
          style={[styles.mainTitle, { paddingHorizontal: 10, fontSize: 18 }]}
          numberOfLines={1}
        >
          {title ?? 'Prayer Request'}
        </Text>
      </FlexSpaceBetweenCenter>
      <View />
      {rightContent}
    </FlexCenter>
  );
};
