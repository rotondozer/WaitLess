import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";

function Input(props: TextInputProps): JSX.Element {
  return <TextInput {...props} style={[styles.textInput, props.style]} />;
}

// -- STYLES

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginTop: 8,
    borderRadius: 12,
    fontSize: 18,
    fontWeight: "400",
  },
});

export default Input;
