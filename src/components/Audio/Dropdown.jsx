import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import Routes from "../../navigation/Routes";

export default function AudioDropdown({
  onPress,
  isVisible,
  media,
  onClose,
  onListen,
} = {}) {
  const navigation = useNavigation();

  const DownloadMedia = () => {
    // call download file api
    // pass id, title, uri
    // downloadThis({id, uri, title})
    // returns a notification
    console.log("downloading media");
    onPress();
  };

  const ShareMedia = () => {
    // call share api
    // pass title, and a link to download the media
    // shareThis(`listen to ${title} \n  ${url}`)
    // returns a notification
    onPress();
  };
  const ListenToMedia = () => {
    // call audio player api
    // navigate to audio player screen
    // pass id, title, author, uri, and time
    // playAudio(id, uri)
    if (onListen) {
      onListen();
    }
  };

  return isVisible ? (
    <>
      <View style={styles.audioListCardDropDown}>
        <Text
          numberOfLines={1}
          style={[{ paddingVertical: 5 }]}
          onPress={DownloadMedia}
        >
          Download
        </Text>
        <Text
          numberOfLines={1}
          style={[{ paddingVertical: 5 }]}
          onPress={ShareMedia}
        >
          Share
        </Text>
        <Text
          numberOfLines={1}
          style={[{ paddingVertical: 5 }]}
          onPress={ListenToMedia}
        >
          Listen
        </Text>
      </View>

      <TouchableOpacity
        style={styles.dropDownOverlay}
        onPress={onClose}
      ></TouchableOpacity>
    </>
  ) : null;
}
