import React from "react";
import { View, Text, Pressable, StyleSheet, StatusBar } from "react-native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Colors, Fonts } from "styles";
import { RootStackParamList, WaitlistStackParamList } from "types";
import Waitlist from "./Waitlist";
import AddPartyForm from "./AddPartyForm";
import EditPartyForm from "./EditPartyForm";

// -- NAVIGATOR

const Tab = createMaterialTopTabNavigator();

enableScreens();
const Stack = createNativeStackNavigator<WaitlistStackParamList>();

type Navigation = StackNavigationProp<RootStackParamList, "Home">;

// -- VIEW

interface Props {
  navigation: Navigation;
  route: RouteProp<RootStackParamList, "Home">;
}

const backgroundColor = Colors.blueGray;

function Home(props: Props): JSX.Element {
  const { email } = props.route.params;
  return (
    <>
      {/* <View style={styles.headerContainer}>
        <Text style={Fonts.title}>Hello, {email}!</Text>
        <SettingsButton navigation={props.navigation} />
      </View> */}
      <StatusBar backgroundColor={backgroundColor} barStyle="dark-content" />
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: Fonts.tabBar,
          style: { backgroundColor },
          indicatorStyle: { backgroundColor: Colors.darkRed },
        }}>
        <Tab.Screen name="Waitlist" component={WaitlistStack} />
        <Tab.Screen name="Tables" component={Tables} />
      </Tab.Navigator>
    </>
  );
}
// Placeholder component
function Tables(): JSX.Element {
  return <View style={{ flex: 1 }} />;
}

// -- PRIVATE

function WaitlistStack(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Waitlist" component={Waitlist} />
      <Stack.Screen name="AddPartyForm" component={AddPartyForm} />
      <Stack.Screen name="EditPartyForm" component={EditPartyForm} />
    </Stack.Navigator>
  );
}

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
