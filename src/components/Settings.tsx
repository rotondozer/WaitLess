import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { User } from "api";
import { Button } from "common";
import { Fonts, Layouts, Colors } from "styles";

function Settings(): JSX.Element | null {
  const [username, updateUsername] = useState("");

  useEffect(() => {
    User.getCurrentUser(updateUsername);
  }, []);

  return (
    <View style={Layouts.container}>
      <Text style={Fonts.title}>Logged in as: {username}</Text>
      <Button
        text="Sign Out"
        style={styles.signOutButton}
        textStyle={styles.signOutButtonText}
        onPress={() => User.signOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  signOutButton: {
    backgroundColor: Colors.whitish,
    borderColor: Colors.blueGray,
    borderWidth: 1,
  },
  signOutButtonText: {
    color: Colors.blueGray,
    fontSize: 18,
  },
});

export default Settings;
