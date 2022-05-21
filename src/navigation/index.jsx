import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Colors from '../constants/Colors';
import ModalScreen from '../screens/ModalScreen';
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
import { BaseWrapper } from '../components/Untils';
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

const headerCompsGenerateor = props => ({
  headerShadowVisible: false,
  headerShown: true,
  headerLeft: MenuIcon(props),
  headerRight: MenuIcon(props, 'notification', () =>
    props.navigation.navigate(Routes.Notification),
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
  return (
    <Stack.Navigator>
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
        <Stack.Screen name="Modal" component={ModalScreen} />
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
        ...headerCompsGenerateor(props),
        tabBarActiveTintColor: Colors().tint,
      }}
      tabBar={props => <TabBar {...props} />}
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
  return () => {
    return (
      <BaseWrapper>
        <ImageIcon
          name={name}
          size={17}
          onPress={onPress || props.navigation.openDrawer}
        />
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
