import React from "react";
import FlexSpaceBetweenCenter, { BaseWrapper } from "../Untils";
import { Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styles from "./style";
import Icon from "../Icon";
import Colors from "../../constants/Colors";

export default function SectionTitle({
  title,
  seeMoreText = "See more",
  onPress,
  hideSeeMore,
}) {
  return (
    <BaseWrapper>
      <FlexSpaceBetweenCenter>
        <Text style={styles.title}>{title}</Text>
        {!hideSeeMore ? (
          <FlexSpaceBetweenCenter>
            <TouchableOpacity onPress={onPress} style={styles.seeMoreBorder}>
              <Text style={styles.seeMoreText}>
                {seeMoreText || "See more"}
              </Text>
            </TouchableOpacity>
            <Icon name={"right"} color={Colors().primary} />
          </FlexSpaceBetweenCenter>
        ) : null}
      </FlexSpaceBetweenCenter>
    </BaseWrapper>
  );
}

export function Title({ title, onPress, color: propsColor, active }) {
  const color = propsColor || (active ? Colors().primary : Colors().text);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Text style={[styles.title, { color }]}>{title}</Text>
    </TouchableWithoutFeedback>
  );
}
