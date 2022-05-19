import * as React from "react";
import { ActivityIndicator, Image, ScrollView } from "react-native";
import { View } from "../../components/Themed";
// @ts-ignore
import OTPInput from "react-native-otp";
import styles from "./style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";
import Colors from "../../constants/Colors";
import { useForm, Controller } from "react-hook-form";
import Notification from "../../components/Notification";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpScheme } from "./validation";
import {
  forgetPasswordService,
  verifyOTPService,
} from "../../services/authentication";
import useReduxState from "../../hooks/useReduxState";
import { rcUserTokenSelector } from "../../store/redux/states";

export default function ActivationCodeScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const [isError, setIsError] = React.useState(false);
  const [enableResend, shouldResend] = React.useState(false);
  const [, setAuthToken] = useReduxState(rcUserTokenSelector);

  React.useEffect(() => {
    if (!route?.params?.email || !route?.params?.next) {
      navigation.goBack();
    }
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      code: "",
      email: route?.params?.email || "",
    },
    resolver: yupResolver(otpScheme),
    mode: "all",
  });
  const onSubmit = handleSubmit(async (data) => {
    setIsError(false);
    const resp = await verifyOTPService(data);
    if (resp.error) {
      setIsError(resp.error.message || resp.message);
      shouldResend(true);
      return;
    }
    setAuthToken(resp.token);
    navigation.navigate(route?.params?.next);
  });

  const onResend = async () => {
    shouldResend(false);
    setIsError("OTP has been sent.");
    setTimeout(() => shouldResend(true), 50000);
    await forgetPasswordService(route?.params || {});
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, { paddingTop: insets.top * 2, flex: 1 }]}
    >
      <View style={[{ paddingTop: insets.top * 3 }]}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../../assets/images/logo-black.png")}
            style={styles.image}
          />
        </View>
        <Spacer size={30} />
        <Notification
          visible={isError}
          message={isError || "Invalid verification code."}
        />
        <Spacer size={8} />
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 6,
          }}
          render={({ field: { onChange, value } }) => (
            <OTPInput
              value={value}
              onChange={onChange}
              tintColor={Colors().primary}
              otpLength={6}
              cellStyle={{ borderRadius: 10 }}
            />
          )}
          name="code"
        />
        <Spacer size={20} />

        <View style={{ alignItems: "center" }}>
          <View style={{ width: 185 }}>
            <Button disabled={!isValid || isSubmitting} onPress={onSubmit}>
              {isSubmitting ? (
                <ActivityIndicator color={"black"} />
              ) : (
                "Verify Code"
              )}
            </Button>

            <Button disabled={!enableResend} onPress={onResend}>
              Resend OTP
            </Button>
          </View>
          <Spacer size={8} />
        </View>
        <Spacer size={30} />
      </View>
    </ScrollView>
  );
}
