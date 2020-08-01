import React from "react";
import { View, Text, StyleSheet } from "react-native";
import UserContext from "../state/user_context";

function Settings() {
  return (
    <UserContext.Consumer>
      {activeUser =>
        activeUser.caseOf({
          None: () => null,
          User: (id, _, email) => (
            <View style={styles.container}>
              <Text>Logged in as: {email}</Text>
              <Text>With id: {id}</Text>
            </View>
          ),
        })
      }
    </UserContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "yellow" },
});

export default Settings;
