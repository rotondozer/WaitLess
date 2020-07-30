import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Alert,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import login from "./api/login";

interface Login {
  userId: string;
  token: string;
}
const User = React.createContext<Login>({ userId: "", token: "" });

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <LoginForm />
        </View>
      </SafeAreaView>
    </>
  );
};

function LoginForm(): JSX.Element {
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Login</Text>
      <TextInput
        style={styles.sectionDescription}
        placeholder="Username"
        value={username}
        onChangeText={updateUsername}
      />
      <TextInput
        style={styles.sectionDescription}
        placeholder="Password"
        value={password}
        onChangeText={updatePassword}
      />
      <Button
        title="Submit"
        onPress={() =>
          login(username, password)
            .then(res => Alert.alert("SUCCESS: " + res.data.user.id))
            .catch(err => Alert.alert("ERR: " + err))
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
});

export default App;
