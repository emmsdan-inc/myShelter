import * as Linking from "expo-linking";

const linking = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: "one",
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: "two",
            },
          },
        },
      },
      Modal: "modal",
      OnBoarding: "OnBoarding",
      Login: "Login",
      Register: "Register",
      NotFound: "*",
    },
  },
};

export default linking;
