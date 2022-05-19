import * as React from "react";
import { ActivityIndicator, Image, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";

import styles from "./style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import data from "./data";
import CheckBox from "expo-checkbox";
import Routes from "../../navigation/Routes";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";
import Colors from "../../constants/Colors";
import FlexSpaceBetweenCenter, {
  FlexSpaceBetween,
} from "../../components/Untils";
import { useForm, Controller } from "react-hook-form";
import Notification from "../../components/Notification";
import { registerService } from "../../services/authentication";
import useAuthenticateUser from "../../hooks/useAuthenticateUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerScheme } from "./validation";

export default function RegisterScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [isError, setIsError] = React.useState(null);
  const [, saveUser] = useAuthenticateUser(navigation);

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      term: false,
    },
    resolver: yupResolver(registerScheme),
    mode: "all",
  });
  const onSubmit = handleSubmit(async (data) => {
    setIsError(null);
    const resp = await registerService(data);
    if (resp.error || resp.errorInfo) {
      const flat = JSON.stringify(resp.error || resp.errorInfo);
      const isUnique = flat.includes("unique validation");
      const isEmailUnique = flat.includes("email") ? "email" : "";
      const isPhoneUnique = flat.includes("phone") ? "phone number" : "";
      setIsError(
        isUnique
          ? `User already with this ${isPhoneUnique} ${
              isPhoneUnique && isEmailUnique ? "and" : ""
            } ${isEmailUnique} already exist.`
          : resp.message
      );
      saveUser({ token: "" });
      return;
    }
    if (!resp) {
      setIsError("Something went wrong. Please try again later.");
      saveUser({ token: "" });
      return;
    }
    await saveUser(resp);
  });

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top * 2 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[]}>
        <Spacer size={8} />
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images/logo-black.png")}
            style={styles.image}
          />
        </View>
        <Spacer size={30} />

        <Notification visible={isError} message={isError} mode={"error"} />
        <Spacer size={8} />
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                icon={"profile"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={data.nameLabel}
                autoComplete={"name"}
              />
            )}
            name="name"
          />
          <Spacer size={8} />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                icon={"message"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
                autoCapitalize={"none"}
                keyboardType="email-address"
                autoComplete={"email"}
                textContentType={"emailAddress"}
              />
            )}
            name="email"
          />
          <Spacer size={8} />
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 11,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                icon={"call"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={data.phoneLabel}
                keyboardType="phone-pad"
                autoComplete={"tel"}
              />
            )}
            name="phone"
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
                autoComplete={"password"}
                icon={"password"}
              />
            )}
            name="password"
          />
          <Spacer size={8} />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FlexSpaceBetween
                activeOpacity={1}
                onPress={() => onChange(!!value)}
              >
                <CheckBox
                  value={!!value}
                  onValueChange={onChange}
                  color={Colors().primary}
                />
                <Text style={[styles.text, { paddingLeft: 5 }]}>
                  I agree, to storing my data and using it
                </Text>
              </FlexSpaceBetween>
            )}
            name="term"
          />
        </View>
        <Spacer size={30} />

        <View style={{ alignItems: "center" }}>
          <View style={{ width: 185 }}>
            <Button disabled={!isValid || isSubmitting} onPress={onSubmit}>
              {isSubmitting ? <ActivityIndicator /> : "Sign up"}
            </Button>
          </View>
          <Spacer size={8} />
          <FlexSpaceBetweenCenter
            onPress={() => navigation.navigate(Routes.Login)}
          >
            <Text style={styles.text}>Have an account?</Text>
            <Text style={[styles.link]}> Login</Text>
          </FlexSpaceBetweenCenter>
        </View>
        <Spacer size={60} />
      </View>
    </ScrollView>
  );
}
