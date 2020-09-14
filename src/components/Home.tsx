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

import { User, Table } from "api";
import { Colors, Fonts } from "styles";
import {
  RootStackParamList,
  WaitlistStackParamList,
  TablesStackParamList,
} from "types";
import Waitlist from "./Waitlist";
import AddPartyForm from "./AddPartyForm";
import EditPartyForm from "./EditPartyForm";
import Tables from "./Tables";
import AvailableTables from "./AvailableTables";

// -- NAVIGATOR

const Tab = createMaterialTopTabNavigator();

enableScreens();
const WaitStack = createNativeStackNavigator<WaitlistStackParamList>();
const TableStack = createNativeStackNavigator<TablesStackParamList>();

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
        <Tab.Screen name="Tables" component={TablesStack} />
      </Tab.Navigator>
    </>
  );
}

// -- PRIVATE

function TablesStack(): JSX.Element {
  return (
    <TableStack.Navigator screenOptions={{ headerShown: false }}>
      <TableStack.Screen name="Tables" component={Tables} />
      <TableStack.Screen name="TableDetails" component={TableDetails} />
    </TableStack.Navigator>
  );
}

function TableDetails(table: Table.Table): JSX.Element {
  // TODO: getPartiesForTable()
  return (
    <View style={{ flex: 1, backgroundColor: Colors.blue }}>
      <Text style={Fonts.title}>Table Details</Text>
      <Text style={Fonts.text2}>{table.name}</Text>
    </View>
  );
}

function WaitlistStack(): JSX.Element {
  return (
    <WaitStack.Navigator screenOptions={{ headerShown: false }}>
      <WaitStack.Screen name="Waitlist" component={Waitlist} />
      <WaitStack.Screen name="AddPartyForm" component={AddPartyForm} />
      <WaitStack.Screen name="EditPartyForm" component={EditPartyForm} />
      <WaitStack.Screen name="AvailableTables" component={AvailableTables} />
    </WaitStack.Navigator>
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
