import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";

import SliderIndicator from "../components/SliderIndicator";
import { scale } from "react-native-size-matters";

export default function NotFoundScreen({ navigation }) {
  const [active, setActive] = React.useState(0);
  const colors = {
    0: "#A8518A",
    1: "#00AFEF",
    2: "#A8CF45",
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Do you want a family where love abounds?</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: scale(63),
        }}
      >
        <SliderIndicator color={colors[active]} active={active === 0} />
        <SliderIndicator color={colors[active]} active={active === 1} />
        <SliderIndicator color={colors[active]} active={active >= 2} />
      </View>
      <TouchableOpacity
        onPress={() => {
          setActive(active >= 2 ? 0 : active + 1);
        }}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
