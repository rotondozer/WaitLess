import React from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "styles";

interface Props extends TextInputProps {
  withLabel?: string;
  containerStyle?: ViewStyle;
}

function Input(props: Props): JSX.Element {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.withLabel && <Text style={styles.label}>{props.withLabel}</Text>}
      <TextInput {...props} style={[styles.textInput, props.style]} />
    </View>
  );
}

// -- STYLES

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: Colors.whitish,
    borderRadius: 5,
    fontSize: 18,
    fontWeight: "400",
  },
  label: {
    marginVertical: 3,
    letterSpacing: 0.5,
  },
  container: {
    margin: 8,
  },
});

export default Input;
