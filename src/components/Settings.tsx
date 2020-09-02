import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { withUserContext, WithUserContext } from "../state/user_context";
import { Fonts, Layouts } from "../styles";
import { Button } from "../common";
import * as User from "../api/user";
import { ActiveUser } from "../types";

function Settings(props: WithUserContext): JSX.Element | null {
  const { user, updateUser } = props;

  return user.caseOf({
    None: () => null,
    User: (id, token, email) => (
      <View style={[Layouts.container, styles.container]}>
        <Text style={Fonts.condensedText}>Logged in as: {email}</Text>
        <Text style={Fonts.condensedText}>With id: {id}</Text>
        <Button
          text="Logout"
          onPress={() =>
            User.logout(id, token)
              .then(res => console.log("LOGGED OUT", res))
              .then(_ => updateUser(ActiveUser.None()))
              .catch(err => console.error(err))
          }
        />
      </View>
    ),
  });
}

const styles = StyleSheet.create({
  container: { backgroundColor: "yellow" },
});

export default withUserContext(Settings);
