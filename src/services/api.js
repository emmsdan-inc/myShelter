import axios from "axios";
import env from "./environment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PROFILE, TOKEN } from "../constants/User";
import { Alert } from "react-native";
import Routes from "../navigation/Routes";
import { getToken } from "../store/redux/getters";
const $http = axios.create({ baseURL: env.baseURL });

$http.interceptors.request.use(async (config) => {
  const token = await getToken();
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: "Bearer " + token,
    },
  };
});
$http.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      Alert.alert(
        "",
        '      Authorization: "Bearer " + token,\n Session has expired. Please login to continue.',
        [
          {
            onPress: async () => {
              await AsyncStorage.removeItem(TOKEN, null);
              const value = JSON.parse(
                (await AsyncStorage.getItem(PROFILE)) || "{}"
              );
              await AsyncStorage.setItem(
                PROFILE,
                JSON.stringify({ email: value.email, name: value.name })
              );
              try {
                $http.$__navigation?.reset({
                  index: 0,
                });
              } catch (error) {
                $http.$__navigation?.navigate(Routes.Login);
              }
            },
            text: "Login",
          },
        ]
      );
    }
    return Promise.reject(error);
  }
);

export default $http;
