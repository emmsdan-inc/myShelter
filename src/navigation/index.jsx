import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Colors from '../constants/Colors';
import NotFoundScreen from '../screens/NotFoundScreen';
import LinkingConfiguration from './LinkingConfiguration';
import Index from '../screens/OnBoarding';
import Routes from './Routes';
import LoginScreen from '../screens/Authentication';
import ForgotPasswordScreen from '../screens/Authentication/ForgotPassword';
import ActivationCodeScreen from '../screens/Authentication/ActivationCode';
import RegisterScreen from '../screens/Authentication/Register';
import SidebarComponent from '../screens/Sidebar';
import ImageIcon from '../components/ImageIcon';
import ChangePasswordScreen from '../screens/Authentication/ChangePassword';
import { BaseWrapper, FlexCenter, Loading } from '../components/Untils';
import TabBar from '../components/NavTab/TabBar';
import HomeScreen from '../screens/Home';
import DiscoverScreen from '../screens/Discover';
import MediaPlayerScreen from '../screens/MediaPlayer';
import VideoScreen from '../screens/Live/Video';
import MixlrMediaPlayerScreen from '../screens/Live/MixLr';
import GiveComponent from '../screens/Give';
import ContactUs from '../screens/ContactUs';
import PrayerRequest from '../screens/PrayerRequest';
import { CreatePrayerRequest } from '../screens/PrayerRequest/PrayerRequest';
import Testimony from '../screens/Testimony';
import { CreateTestimony } from '../screens/Testimony/Testimony';
import useAuthenticateUser from '../hooks/useAuthenticateUser';
import { useInterval } from 'usehooks-ts';
import { Octicons } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import useReduxState from "../hooks/useReduxState";
import { rcMediaLiveEventAtom } from "../store/redux/states";
import { getLiveEvent } from "../components/LiveEventPlaceholders";
import { TouchableOpacity } from "react-native-gesture-handler";

const headerCompsGenerateor = (props, toggle) => ({
  headerShadowVisible: false,
  headerShown: true,
  headerLeft: MenuIcon(props, 'menu', toggle),
  headerRight: MenuIcon(props, 'broadcast', () =>
    props.navigation?.navigate(Routes.Notification),
  ),
  headerTitle: () => <></>,
});
export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={Colors()}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  const [, , , isLoggedIn] = useAuthenticateUser();

  return !['false', 'true'].includes(isLoggedIn) ? (
    <Loading />
  ) : (
    <Stack.Navigator
      initialRouteName={
        isLoggedIn === 'false' ? Routes.OnBoarding : Routes.Home
      }
    >
      <Stack.Screen
        name={Routes.OnBoarding}
        component={Index}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.Login}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.Register}
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.ForgotPassword}
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.ActivationCode}
        component={ActivationCodeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.ChangePassword}
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.NotFound}
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Screen
        name={Routes.Home}
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={DrawerNavigator} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function DeepStackNavigator(props) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={Routes.DiscoverHome}
    >
      <Stack.Screen name={Routes.DiscoverHome} component={DiscoverScreen} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator(props) {
  return (
    <BottomTab.Navigator
      initialRouteName={'Root'}
      screenOptions={{
        ...headerCompsGenerateor(props, props.navigation.toggleDrawer),
        tabBarActiveTintColor: Colors().tint,
      }}
      tabBar={tabProps => <TabBar {...tabProps} props={props} />}
    >
      <BottomTab.Screen name={Routes.Home} component={HomeScreen} />
      <BottomTab.Screen
        name={Routes.Discover}
        component={DeepStackNavigator}
        options={{ headerShown: false }}
      />

      <BottomTab.Screen name={Routes.Give} component={GiveComponent} />
      <BottomTab.Screen name="TabTwo" component={DiscoverScreen} />
      <BottomTab.Screen name={Routes.LiveVideo} component={VideoScreen} />
      <BottomTab.Screen
        options={{ headerShown: false }}
        name={Routes.MediaPlayer}
        component={MediaPlayerScreen}
      />
      <BottomTab.Screen
        options={{ headerShown: false }}
        name={Routes.MixlrMediaPlayer}
        component={MixlrMediaPlayerScreen}
      />
      <BottomTab.Screen
        // options={{ headerShown: false }}
        name={Routes.ContactUs}
        component={ContactUs}
      />
      <BottomTab.Screen
        options={{ headerShown: false }}
        name={Routes.PrayerRequest}
        component={PrayerRequest}
      />
      <BottomTab.Screen
        options={{ headerShown: false }}
        name={Routes.CreatePrayerRequest}
        component={CreatePrayerRequest}
      />
      <BottomTab.Screen
        options={{ headerShown: false }}
        name={Routes.Testimony}
        component={Testimony}
      />
      <BottomTab.Screen
        options={{ headerShown: false }}
        name={Routes.CreateTestimony}
        component={CreateTestimony}
      />
    </BottomTab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MenuIcon(props, name = 'menu', onPress = () => {}) {
  const navigation = useNavigation();
  const [liveEvent] = useReduxState(rcMediaLiveEventAtom);
  const event = getLiveEvent(liveEvent, navigation);
  return () => {
    return (
      <BaseWrapper>
        {
          name === 'broadcast' && event.live ?
            <TouchableOpacity onPress={event.go} style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Octicons
                name="broadcast"
                size={14}
                color={Colors().error}
                style={{ paddingVertical: 10, paddingLeft: 10 }}
                onPress={event.go}
              />
              <Text style={{color: Colors().error, fontSize: 13, fontFamily: 'Nunito'}}>{' '}live</Text>
            </TouchableOpacity>
       :
        <ImageIcon
          name={name}
          size={17}
          onPress={onPress || navigation?.toggleDrawer}
          color={Colors().text}
        />}
      </BaseWrapper>
    );
  };
}
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="App"
      drawerContent={props => <SidebarComponent {...props} />}
    >
      <Drawer.Screen
        name="App"
        component={BottomTabNavigator}
        options={props => ({
          drawerLabel: '',
          headerShown: false,
        })}
      />
    </Drawer.Navigator>
  );
}
