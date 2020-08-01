import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginForm from "./src/LoginForm";
import * as ActiveUser from "./types/active_user";

const UserContext = React.createContext<ActiveUser.ActiveUser>(
  ActiveUser.None(),
);

function App(): JSX.Element {
  const [activeUser, updateUser] = useState<ActiveUser.ActiveUser>(
    ActiveUser.None(),
  );
  return (
    <View style={styles.container}>
      {activeUser.caseOf({
        None: () => <LoginForm onLogin={updateUser} />,
        User: (_, __, email) => (
          <View style={{ flex: 1, backgroundColor: "green" }}>
            <Text>Logged in as: {email}</Text>
          </View>
        ),
      })}
    </View>
  );
}

// -- STYLES

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
