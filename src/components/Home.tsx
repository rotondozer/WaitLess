import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { User } from "api";
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

function Home(props: Props): JSX.Element {
  const [user, updateUser] = useState("");

  useEffect(() => {
    User.getCurrentUser(updateUser);
  }, []);

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={Fonts.condensedText}>Hello, {user}!</Text>
        <SettingsButton navigation={props.navigation} />
      </View>
      <StatusBar backgroundColor={Colors.blueGray} barStyle="dark-content" />
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: Fonts.tabBar,
          style: styles.tabBar,
          indicatorStyle: styles.tabBarIndicator,
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
      <Image
        source={require("src/assets/settings.png")}
        style={styles.settingsButton}
      />
    </Pressable>
  );
}

// -- STYLES

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.blueGray,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 25,
    padding: 5,
  },
  settingsButton: {
    height: 25,
    width: 25,
  },
  tabBar: {
    backgroundColor: Colors.blueGray,
    elevation: 0,
  },
  tabBarIndicator: {
    backgroundColor: Colors.darkRed,
  },
});

export default Home;
