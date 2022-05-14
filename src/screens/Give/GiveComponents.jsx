import React from "react";
import { Text, View } from "../../components/Themed";
import styles from "./style";
import Spacer from "../../components/Spacer";
import data from "./data";

export const GiveAccountInfo = () => {
  return data.bankAccountInfo.map((item, index) => (
    <View key={`${index}${item.accountNumber}`} style={{ width: "100%" }}>
      <Text style={styles.heading2}>{item.name}</Text>
      <Text style={styles.text}>Account Name: {item.bankName}</Text>
      <Text style={styles.text}>Account Number: {item.accountNumber}</Text>
      <Text style={styles.text}>Account Sort Code: {item.bankName}</Text>
      <Spacer size={8} />
    </View>
  ));
};
