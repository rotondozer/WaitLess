import "react-native-gesture-handler"; // Needs to stay above everything else
import React from "react";
import { View, LogBox } from "react-native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

import { RootStackParamList } from "./types";
import { Colors } from "styles";
import { withAuthentication } from "api";

import Home from "./components/Home";
import Settings from "./components/Settings";
import EditPartyForm from "./components/EditPartyForm";
import AddPartyForm from "./components/AddPartyForm";
import AvailableTables from "./components/AvailableTables";
import TableDetails from "./components/TableDetails";

// -- GRAPHQL API

Amplify.configure(awsconfig);

// -- NAVIGATION

enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Not using state persistence or deep linking, so ignoring the warning so I can pass callbacks as params.
// https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

// -- ROOT VIEW

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Stack.Navigator
          screenOptions={({ route }) => ({
            headerShown: route.name !== "Home",
            headerStyle: { backgroundColor: Colors.blueGray },
            headerTintColor: Colors.blackish,
          })}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="EditPartyForm" component={EditPartyForm} />
          <Stack.Screen name="AddPartyForm" component={AddPartyForm} />
          <Stack.Screen name="AvailableTables" component={AvailableTables} />
          <Stack.Screen name="TableDetails" component={TableDetails} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

export default withAuthentication(App);
