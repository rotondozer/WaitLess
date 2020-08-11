import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Waitlist from "./Waitlist";
import { Fonts } from "../styles";
import { WithUserContext, withUserContext } from "../state/user_context";

const Tab = createMaterialTopTabNavigator();

// TODO: prop types
function Home(props: any): JSX.Element {
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={Fonts.title}>Hello, {props.route.params.email}!</Text>
        <SettingsButton />
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Waitlist" component={Waitlist} />
        <Tab.Screen name="Tables" component={Tables} />
      </Tab.Navigator>
    </>
  );
}
// Placeholder component
const Tables = () => <View style={{ flex: 1, backgroundColor: "blue" }} />;

// -- PRIVATE

function SettingsButton(): JSX.Element {
  return (
    <Pressable onPress={() => {}}>
      <Text>Settings</Text>
    </Pressable>
  );
}

// -- STYLES

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    padding: 5,
  },
});

export default Home;
