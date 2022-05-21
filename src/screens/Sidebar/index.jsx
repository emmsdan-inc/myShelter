import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';

import { scale } from 'react-native-size-matters';
import styles from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import data from './data';
import { APPLICATION_NAME } from '../../constants/App';
import Spacer from '../../components/Spacer';
import FlexSpaceBetweenCenter from '../../components/Untils';
import Icon from '../../components/Icon';
import ImageIcon from '../../components/ImageIcon';
import Colors from '../../constants/Colors';
import useAuthenticateUser from '../../hooks/useAuthenticateUser';

export default function SidebarComponent({ navigation }) {
  const insets = useSafeAreaInsets();
  const [profile, , logout] = useAuthenticateUser(navigation);
  const [active, setActive] = React.useState(0);
  const onMenuPress = menu => {
    return () => {
      if (menu.toLowerCase() === 'logout') {
        logout();
      } else {
        navigation.navigate(menu);
      }
    };
  };
  const uri = ''; //https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1180&q=80'
  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingHorizontal: scale(32) },
      ]}
    >
      <Spacer size={scale(20)} />
      <FlexSpaceBetweenCenter style={{ width: '95%' }}>
        {uri ? (
          <Image
            source={{ uri }}
            style={{ width: scale(37), height: scale(37), borderRadius: 50 }}
          />
        ) : (
          <Icon name={'profile'} size={scale(30)} />
        )}
        <ImageIcon
          name={'close'}
          size={scale(15)}
          onPress={navigation.closeDrawer}
        />
      </FlexSpaceBetweenCenter>

      <View style={styles.menu}>
        <Text style={[styles.heading]} numberOfLines={1}>
          Welcome,{' '}
          <Text style={[styles.heading2]} numberOfLines={1}>
            {profile.name}
          </Text>
        </Text>
      </View>

      <Spacer size={scale(20)} />

      {data.sideMenu.map((menu, index) =>
        menu.spacer ? (
          <Spacer size={scale(menu.spacer)} key={index} />
        ) : (
          <TouchableOpacity
            style={styles.menu}
            key={menu.label + index}
            onPress={onMenuPress(menu.uri)}
          >
            <Text style={[styles.menuText]}>{menu.label}</Text>
            <Icon name={menu.icon} color={Colors().primary} size={15} />
          </TouchableOpacity>
        ),
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>{APPLICATION_NAME}</Text>
        <Text style={styles.footerText}>@{new Date().getFullYear()}</Text>
      </View>
    </View>
  );
}
