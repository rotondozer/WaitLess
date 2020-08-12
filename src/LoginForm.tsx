import React, { useState, Dispatch, SetStateAction } from "react";
import { View, Text, TextInput, Alert, StyleSheet, Button } from "react-native";

import { User } from "./api";
import { ActiveUser } from "./types";

interface LoginFormProps {
  onLogin: (user: ActiveUser.ActiveUser) => void;
}

function LoginForm(props: LoginFormProps): JSX.Element {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={username}
        onChangeText={updateUsername}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={updatePassword}
      />
      <Button
        title="Submit"
        onPress={() => login(username, password, props.onLogin)}
      />
    </View>
  );
}

// -- PRIVATE

function login(
  username: string,
  password: string,
  updateActiveUser: (u: ActiveUser.ActiveUser) => void,
): void {
  User.login(username, password)
    .then(res => res.data.user)
    .then(({ id, token, email }) => ActiveUser.User(id, token, email))
    .then(updateActiveUser)
    .catch(err => Alert.alert(JSON.stringify(err)));
}

// -- STYLES

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#FFF",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  textInput: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
});

export default LoginForm;
