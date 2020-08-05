import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import requestLogin from "../api/login";
import * as ActiveUser from "../types/active_user";

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
        onPress={() =>
          requestLogin(username, password)
            .then(res => res.data.user)
            .then(({ id, token, email }) => ActiveUser.User(id, token, email))
            .then(props.onLogin)
            .catch(err => Alert.alert("Login Failed" + err))
        }
      />
    </View>
  );
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
