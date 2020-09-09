import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
} from "react-native";
import { Colors, Fonts } from "styles";

interface Props {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

function Button(props: Props): JSX.Element {
  const { text, style, textStyle, onPress } = props;
  return (
    <Pressable onPress={onPress} style={s => buttonStyle(s, style)}>
      <Text style={[Fonts.buttonText, textStyle]}>{text}</Text>
    </Pressable>
  );
}

function buttonStyle(
  { pressed }: { pressed: boolean },
  extraStyle?: StyleProp<ViewStyle>,
): StyleProp<ViewStyle> {
  const style: StyleProp<ViewStyle> = [styles.button];
  if (extraStyle) {
    style.push(extraStyle);
  }
  if (pressed) {
    style.push(styles.buttonPressed);
  }
  return style;
}

const backgroundColor = Colors.blue;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: "100%",
    marginVertical: 10,
    backgroundColor,
    borderRadius: 5,
    elevation: 10,
  },
  buttonPressed: {
    backgroundColor: backgroundColor.concat("70"),
    elevation: 0,
  },
});

export default Button;
