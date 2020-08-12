import React, { useState, Dispatch, SetStateAction } from "react";
import { View, Text, TextInput, Alert, StyleSheet, Button } from "react-native";
import { RemoteData, NotAsked, Loading, Failure, Success } from "seidr";

import { User } from "./api";
import { ActiveUser } from "./types";

interface LoginFormProps {
  onLogin: (user: ActiveUser.ActiveUser) => void;
}

type LoginRequest = RemoteData<string, string>;

function LoginForm(props: LoginFormProps): JSX.Element {
  const [loginRequest, updateLoginRequest] = useState<LoginRequest>(NotAsked());

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
        onPress={() =>
          login(username, password, updateLoginRequest, props.onLogin)
        }
      />
    </View>
  );
}

// -- PRIVATE

function login(
  username: string,
  password: string,
  updateLoginState: Dispatch<SetStateAction<LoginRequest>>,
  updateActiveUser: (u: ActiveUser.ActiveUser) => void,
): void {
  updateLoginState(Loading());

  User.login(username, password)
    .then(res => res.data.user)
    .then(({ id, token, email }) => ActiveUser.User(id, token, email))
    .then(updateActiveUser)
    .then(() => updateLoginState(Success("TODO")))
    .catch(err => updateLoginState(Failure(JSON.stringify(err))));
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
