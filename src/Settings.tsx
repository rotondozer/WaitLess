import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { withUserContext, WithUserContext } from "../state/user_context";

function Settings(props: WithUserContext) {
  return props.user.caseOf({
    None: () => null,
    User: (id, _, email) => (
      <View style={styles.container}>
        <Text>Logged in as: {email}</Text>
        <Text>With id: {id}</Text>
      </View>
    ),
  });
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "yellow" },
});

export default withUserContext(Settings);
