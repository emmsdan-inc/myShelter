import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { returnStyle } from "../../shared/helpers/general";
import Icon from "../Icon";
import clsx from "clsx";
import Colors from "../../constants/Colors";
import ImageIcon from "../ImageIcon";
export default function Input(props = {}) {
  const { icon, onIconPress } = props;
  const [isPassword, setIsPassword] = React.useState(
    props.secureTextEntry || false,
  );
  const textInput = returnStyle([!!icon], [{ paddingRight: 40 }]);
  const passIcon = props.secureTextEntry ? "hide" : null;
  function onIconPressEvent() {
    if (props.secureTextEntry) {
      setIsPassword(!isPassword);
    }
    if (onIconPress) onIconPress();
  }
  const iconColor = clsx({
    [Colors().primary]: props.secureTextEntry ? isPassword : true,
    [Colors().primary2]: !isPassword && props.secureTextEntry,
  });
  return (
    <View style={[{ position: "relative" }]}>
      <TextInput
        {...props}
        secureTextEntry={!!isPassword}
        style={[styles.inputContainer, styles.textInput, textInput]}
      />
      {icon || passIcon ? (
        <TouchableOpacity
          style={[styles.iconContainer]}
          onPress={onIconPressEvent}
        >
          <Icon name={icon || passIcon} color={iconColor} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export const SearchInput = ({
  value: propsValue,
  onSearch,
  onTextChange,
  placeholder,
} = {}) => {
  const [value, setValue] = React.useState(propsValue || "");
  const onChangeText = value => {
    setValue(value);
    if (onTextChange) onTextChange(value);
  };
  return (
    <View
      style={{
        position: "relative",
        height: 58,
      }}
    >
      <TextInput
        value={value}
        placeholder={placeholder || "Search"}
        onChangeText={onChangeText}
        style={styles.inputSearch}
      />
      <View style={styles.searchIcon}>
        <ImageIcon name={"search"} size={16} onPress={() => onSearch(value)} />
      </View>
    </View>
  );
};
