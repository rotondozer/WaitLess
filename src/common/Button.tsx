import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Colors, Fonts } from "styles";

interface Props {
  text: string;
  onPress: () => void;
}

function Button(props: Props): JSX.Element {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) =>
        pressed ? [styles.button, styles.buttonPressed] : styles.button
      }>
      <Text style={Fonts.buttonText}>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: "100%",
    marginVertical: 10,
    backgroundColor: Colors.teal,
    borderRadius: 5,
    elevation: 10,
  },
  buttonPressed: {
    backgroundColor: Colors.lightBlueOpaque,
  },
});

export default Button;
