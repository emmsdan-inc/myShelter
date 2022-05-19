import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import Icon from "../Icon";
import FlexSpaceBetweenCenter, { FlexCenter } from "../Untils";
import Colors from "../../constants/Colors";
import AudioDropdown from "./Dropdown";
import { useNavigation } from "@react-navigation/native";
import Routes from "../../navigation/Routes";

export default function AudioListCard({
  uri,
  onPress,
  title,
  author,
  time,
  id,
  media,
  playlistIndex,
  playlist,
} = {}) {
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigation();
  const navigate = () => {
    if (onPress) onPress();
    navigation.navigate(Routes.MediaPlayer, {
      ...(media || {}),
      playlistIndex,
      playlist,
    });
  };

  const onPressable = () => {
    setOpen(!open);
    if (onPress) onPress();
  };
  const source = uri ? { uri } : require("../../../assets/images/logo.png");
  return (
    <TouchableOpacity onPress={navigate}>
      <View style={styles.audioListCard}>
        <Image source={source} style={styles.audioListCardImage} />
        <FlexCenter style={styles.audioListCardContent}>
          <Text style={styles.audioListCardTitle} numberOfLines={1}>
            {title}
          </Text>
          <FlexSpaceBetweenCenter>
            <Text
              numberOfLines={1}
              style={[
                styles.audioListCardSmallFont,
                styles.audioListCardAuthor,
              ]}
            >
              {author}
            </Text>
            <Text numberOfLines={1} style={[styles.audioListCardSmallFont]}>
              {time}
            </Text>
          </FlexSpaceBetweenCenter>
        </FlexCenter>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressable}
          style={styles.audioListCardIcon}
        >
          <Icon name="dot-3" size={30} color={Colors().primary} />
        </TouchableOpacity>
      </View>
      <AudioDropdown
        isVisible={open}
        onPress={onPressable}
        {...{ uri, title, author, time, id }}
        media={media}
        onClose={() => setOpen(false)}
        onListen={navigate}
      />
    </TouchableOpacity>
  );
}
