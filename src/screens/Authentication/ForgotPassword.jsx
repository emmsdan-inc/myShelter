import * as React from 'react';
import { ActivityIndicator, Image, ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';

import styles from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Routes from '../../navigation/Routes';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Spacer from '../../components/Spacer';
import FlexSpaceBetweenCenter from '../../components/Untils';
import { useForm, Controller } from 'react-hook-form';
import Notification from '../../components/Notification';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordScheme } from './validation';
import { forgetPasswordService } from '../../services/authentication';
import Logo from '../../components/Logo';

export default function ForgotPasswordScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [isError, setIsError] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgotPasswordScheme),
    mode: 'all',
  });
  const onSubmit = React.useCallback(
    handleSubmit(async data => {
      try {
        setIsError(false);
        const resp = await forgetPasswordService(data);
        if (resp.error) {
          setIsError(resp.message);
          return;
        }
        navigation.navigate(Routes.ActivationCode, {
          ...data,
          next: Routes.ChangePassword,
        });
      } catch (error) {
        setIsError(error.message);
      }
    }),
    [navigation, isError, isValid],
  );

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top * 2, flex: 1 }]}
    >
      <View style={[{ paddingTop: insets.top * 3 }]}>
        <View style={{ alignItems: 'center' }}>
          <Logo />
        </View>
        <Spacer size={30} />
        <Notification
          visible={isError}
          message={'Email address provided does not exist'}
        />
        <Spacer size={3} />
        <Text>Forgot Password</Text>
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
              placeholder="Email Address"
              keyboardType="email-address"
              autoComplete={'email'}
              textContentType={'emailAddress'}
            />
          )}
          name="email"
        />
        <Spacer size={20} />

        <View style={{ alignItems: 'center' }}>
          <View style={{ width: 185 }}>
            <Button disabled={!isValid || isSubmitting} onPress={onSubmit}>
              {isSubmitting ? <ActivityIndicator color={'black'} /> : 'Reset'}
            </Button>
          </View>
          <Spacer size={8} />
          <FlexSpaceBetweenCenter
            onPress={() => navigation.navigate(Routes.Login)}
          >
            <Text style={styles.text}>I have my credential?</Text>
            <Text style={[styles.link]}> Login</Text>
          </FlexSpaceBetweenCenter>
        </View>
        <Spacer size={60} />
      </View>
    </ScrollView>
  );
}
