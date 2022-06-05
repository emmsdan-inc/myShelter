import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../navigation/Routes';
import Colors from '../../constants/Colors';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import Icon from "../Icon";

export default function AudioDropdown({
  onPress,
  isVisible,
  media,
  onClose,
  onListen,
  placeholder,
} = {}) {
  const navigation = useNavigation();

  const DownloadMedia = () => {
    // call download file api
    // pass id, title, uri
    // downloadThis({id, uri, title})
    // returns a notification
    console.log('downloading media');
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
  const style = { paddingVertical: 2, paddingHorizontal: 10, color: Colors().blackGlaze };
  
  return isVisible ? (
    <>
      <Menu onClose={onClose}>
        <MenuTrigger>
          {placeholder}
        </MenuTrigger>
        <MenuOptions customStyles={{ optionsContainer: { paddingVertical: 10, maxWidth: 110, shadowOpacity: 0.1 }}}>
          <MenuOption onSelect={DownloadMedia}>
            <Text numberOfLines={1} style={[style]} onPress={ListenToMedia}>
              Download
            </Text>
          </MenuOption>
          <MenuOption onSelect={ShareMedia}>
            <Text numberOfLines={1} style={[style]} onPress={ListenToMedia}>
              Share
            </Text>
          </MenuOption>
          <MenuOption onSelect={ListenToMedia}>
            <Text numberOfLines={1} style={[style]} onPress={ListenToMedia}>
              Listen
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </>
  ) : null;
}
