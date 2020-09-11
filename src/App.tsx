import "react-native-gesture-handler"; // Needs to stay above everything else
import React from "react";
import { View, LogBox } from "react-native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react-native";

import Home from "./components/Home";
import Settings from "./components/Settings";
import { RootStackParamList } from "./types";
import { Colors } from "styles";

// -- AMPLIFY AUTHENTICATION

import { I18n } from "aws-amplify";

// https://github.com/aws-amplify/amplify-js/blob/main/packages/amplify-ui-components/src/common/Translations.ts
I18n.putVocabulariesForLanguage("en-US", {
  ["Sign in to your account"]: "Sign in to WaitLess",
  // ["Please Sign In / Sign Up"]: "",
});

const container = Object.assign({}, AmplifyTheme.container, {
  backgroundColor: Colors.whitish,
});
const button = Object.assign({}, AmplifyTheme.button, {
  backgroundColor: Colors.blueGray,
  borderRadius: 5,
});
const buttonDisabled = Object.assign({}, AmplifyTheme.button, {
  backgroundColor: Colors.blueGray.concat("80"),
  borderRadius: 5,
});
const sectionFooterLink = Object.assign({}, AmplifyTheme.sectionFooterLink, {
  color: Colors.blue,
});

const AuthenticatorTheme = Object.assign({}, AmplifyTheme, {
  container,
  button,
  buttonDisabled,
  sectionFooterLink,
});

const signUpConfig = {
  header: "Create a new WaitLess account",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Username",
      key: "username",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 2,
      type: "password",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 3,
      type: "string",
    },
  ],
};

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
            headerShown: route.name === "Settings",
            headerStyle: { backgroundColor: Colors.blueGray },
            headerTintColor: Colors.blackish,
          })}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

export default withAuthenticator(
  App,
  undefined,
  undefined,
  undefined,
  AuthenticatorTheme,
  signUpConfig,
);
