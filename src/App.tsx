import "react-native-gesture-handler"; // Needs to stay above everything else
import React, { useState } from "react";
import { View, YellowBox } from "react-native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";

// import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Settings from "./components/Settings";
import { UserContext } from "./state/user_context";
import { ActiveUser, RootStackParamList } from "./types";

// -- GRAPHQL API

Amplify.configure(awsconfig);

// -- NAVIGATION

enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Not using state persistence or deep linking, so ignoring the warning so I can pass callbacks as params.
// https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);

// -- ROOT VIEW

function App(): JSX.Element {
  const [activeUser, updateUser] = useState<ActiveUser.ActiveUser>(
    ActiveUser.None(),
  );
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <UserContext.Provider value={{ user: activeUser, updateUser }}>
          <Stack.Navigator
            screenOptions={({ route }) => ({
              headerShown: route.name === "Settings",
            })}>
            <Stack.Screen
              name="Home"
              component={Home}
              initialParams={{ email: "TEMP TODO" }}
            />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        </UserContext.Provider>
      </View>
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
