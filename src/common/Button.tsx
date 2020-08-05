import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

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
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    width: "50%",
    marginVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 12,
    borderWidth: 3,
  },
  buttonPressed: {
    backgroundColor: "rgba(120, 120, 120, 0.1)",
  },
});

export default Button;
