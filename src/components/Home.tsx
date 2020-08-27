import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Fonts } from "../styles";
import { RootStackParamList } from "../types";
import Waitlist from "./Waitlist";

// -- NAVIGATOR

const Tab = createMaterialTopTabNavigator();

type Navigation = StackNavigationProp<RootStackParamList, "Home">;

// -- VIEW

interface Props {
  navigation: Navigation;
  route: RouteProp<RootStackParamList, "Home">;
}

function Home(props: Props): JSX.Element {
  const { email } = props.route.params;
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={Fonts.title}>Hello, {email}!</Text>
        <SettingsButton navigation={props.navigation} />
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Waitlist" component={Waitlist} />
        <Tab.Screen name="Tables" component={Tables} />
      </Tab.Navigator>
    </>
  );
}
// Placeholder component
function Tables(): JSX.Element {
  return <View style={{ flex: 1, backgroundColor: "blue" }} />;
}

// -- PRIVATE

function SettingsButton(props: { navigation: Navigation }): JSX.Element {
  return (
    <Pressable onPress={() => props.navigation.navigate("Settings")}>
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
