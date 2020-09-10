import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, Button } from "react-native";

import * as User from "../api/user";
import { ActiveUser } from "../types";
import { Fonts } from "styles";
import { Auth } from "aws-amplify";

interface LoginFormProps {
  onLogin: (user: ActiveUser.ActiveUser) => void;
}

function LoginForm(props: LoginFormProps): JSX.Element {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");

  return (
    <View style={styles.sectionContainer}>
      <Text style={Fonts.title}>Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={username}
        onChangeText={updateUsername}
      />
      <TextInput
        style={[Fonts.text2, styles.textInput]}
        placeholder="Password"
        value={password}
        onChangeText={updatePassword}
      />
      <Button
        title="Submit"
        onPress={() =>
          Auth.signIn(username, password)
            .then(thing => {
              console.log("THING", thing);
              props.onLogin(
                ActiveUser.User("fake-id", "fake-token", "fake-email"),
              );
            })
            .catch(e => {
              console.log("Error", e);
            })
        }
      />
    </View>
  );
}

// -- PRIVATE

async function signIn(username: string, password: string): Promise<any> {
  try {
    const user = await Auth.signIn(username, password);
    return Promise.resolve(user);
  } catch (error) {
    console.log("error signing in", error);
    return Promise.reject(JSON.stringify(error));
  }
}

function login(
  username: string,
  password: string,
  updateActiveUser: (u: ActiveUser.ActiveUser) => void,
): void {
  User.login(username, password).caseOf({
    Ok: updateActiveUser,
    Err: err =>
      err.caseOf({
        Unauthorized: () => Alert.alert("Wrong email or password"),
        ServerDown: () => Alert.alert("Could not communicate with server."),
        _: () => Alert.alert("Something terrible has happened."),
      }),
  });
}

// -- STYLES

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  textInput: {
    marginTop: 8,
  },
});

export default LoginForm;
