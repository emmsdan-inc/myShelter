import * as React from 'react';
import { ActivityIndicator, Image, ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';

import styles from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CheckBox from 'expo-checkbox';
import Routes from '../../navigation/Routes';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Spacer from '../../components/Spacer';
import Colors from '../../constants/Colors';
import FlexSpaceBetweenCenter from '../../components/Untils';
import { useForm, Controller } from 'react-hook-form';
import Notification from '../../components/Notification';
import { loginService } from '../../services/authentication';
import useAuthenticateUser from '../../hooks/useAuthenticateUser';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginScheme } from './validation';
import { useInterval } from 'usehooks-ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store, { persistor } from '../../store/redux';
import Logo from "../../components/Logo";

export default function LoginScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [isError, setIsError] = React.useState(null);
  const [user, saveUser] = useAuthenticateUser(navigation);

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      email: user?.email || '',
      password: '',
      rememberMe: true,
    },
    resolver: yupResolver(loginScheme),
    mode: 'all',
  });
  const onSubmit = handleSubmit(async data => {
    setIsError(null);
    const resp = await loginService(data);
    if (resp.error) {
      setIsError(resp.message);
      saveUser({ token: '' });
      return;
    }
    // console.log(resp)
    await saveUser(resp);
  });

  // useInterval(()=> {
  //   AsyncStorage.getAllKeys(async (keys) => {
  //     console.log({keys}, 's')
  //     if (keys && Array.isArray(keys)) {
  //       const asunc = await AsyncStorage.multiGet(keys);
  //       console.log( { asunc })
  //     }
  //   })
  //   console.log(store.getState(), persistor)
  // }, 2000000)
  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top * 2 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[]}>
        <View>
          <Spacer size={30} />
          <View style={{ alignItems: 'center' }}>
            <Logo />
          </View>
          <Spacer size={30} />
          <Notification visible={!!isError} message={isError} mode={'error'} />
          <Spacer size={8} />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                icon={'message'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
                keyboardType="email-address"
                autoComplete={'email'}
                textContentType={'emailAddress'}
                autoCapitalize={'none'}
              />
            )}
            name="email"
          />
          <Spacer size={8} />
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 6,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                secureTextEntry
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoComplete={'password'}
              />
            )}
            name="password"
          />
          <Spacer size={8} />
          <FlexSpaceBetweenCenter>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <FlexSpaceBetweenCenter
                  activeOpacity={1}
                  onPress={() => onChange(!!value)}
                >
                  <CheckBox
                    value={!!value}
                    onValueChange={onChange}
                    color={Colors().primary}
                  />
                  <Text style={[styles.text, { paddingLeft: 5 }]}>
                    Remember me
                  </Text>
                </FlexSpaceBetweenCenter>
              )}
              name="rememberMe"
            />
            <FlexSpaceBetweenCenter
              onPress={() => navigation.navigate(Routes.ForgotPassword)}
            >
              <Text style={styles.text}>Forgot password?</Text>
              <Text style={[styles.link]}> Click here</Text>
            </FlexSpaceBetweenCenter>
          </FlexSpaceBetweenCenter>
          <Spacer size={30} />

          <View style={{ alignItems: 'center' }}>
            <View style={{ width: 185 }}>
              <Button disabled={!isValid || isSubmitting} onPress={onSubmit}>
                {isSubmitting ? <ActivityIndicator color={'black'} /> : 'Login'}
              </Button>
            </View>
            <Spacer size={8} />
            <FlexSpaceBetweenCenter
              onPress={() => navigation.navigate(Routes.Register)}
            >
              <Text style={styles.text}>Don’t have an account?</Text>
              <Text style={[styles.link]}> Sign up</Text>
            </FlexSpaceBetweenCenter>
          </View>
          <Spacer size={60} />
        </View>
      </View>
    </ScrollView>
  );
}
