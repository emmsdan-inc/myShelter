import * as React from "react";
import { ActivityIndicator, Image, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";

import styles from "./style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Routes from "../../navigation/Routes";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Spacer from "../../components/Spacer";
import FlexSpaceBetweenCenter from "../../components/Untils";
import { useForm, Controller } from "react-hook-form";
import Notification from "../../components/Notification";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordScheme } from "./validation";
import { changePasswordService } from "../../services/authentication";

export default function ChangePasswordScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [isError, setIsError] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      password1: "",
    },
    resolver: yupResolver(changePasswordScheme),
    mode: "all",
  });
  const onSubmit = handleSubmit(async (data) => {
    // console.log({data})
    if (data.password !== data.password1) {
      setIsError("Password does not match");
      return;
    }
    setIsError(false);
    const resp = await changePasswordService({ ...data });
    if (resp.error || !resp.continue) {
      setIsError(resp.error.message || resp.message);
      return;
    }
    setIsError("success");
    setTimeout(() => navigation.navigate(Routes.Login), 3000);
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, { paddingTop: insets.top * 2, flex: 1 }]}
    >
      <View style={[{ paddingTop: insets.top * 3 }]}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images/logo-black.png")}
            style={styles.image}
          />
        </View>
        <Spacer size={30} />
        <Notification
          visible={isError}
          mode={isError === "success" ? "success" : "notification"}
          message={
            isError === "success"
              ? "Your password has been updated successfully. Please log in again."
              : isError
          }
        />
        <Spacer size={3} />
        <Text>Change Password</Text>
        <Spacer size={8} />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter new password"
              secureTextEntry
            />
          )}
          name="password1"
        />
        <Spacer size={8} />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Re-enter new password"
            />
          )}
          name="password"
        />
        <Spacer size={20} />

        <View style={{ alignItems: "center" }}>
          <View style={{ width: 185 }}>
            <Button disabled={!isValid || isSubmitting} onPress={onSubmit}>
              {isSubmitting ? <ActivityIndicator color={"black"} /> : "Reset"}
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
