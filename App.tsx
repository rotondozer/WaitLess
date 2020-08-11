import "react-native-gesture-handler";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import LoginForm from "./src/LoginForm";
import Settings from "./src/Settings";
import Waitlist from "./src/Waitlist";
import { UserContext } from "./state/user_context";
import * as ActiveUser from "./types/active_user";
import { Fonts, Layouts } from "./styles";

const Tab = createMaterialTopTabNavigator();

function App(): JSX.Element {
  const [activeUser, updateUser] = useState<ActiveUser.ActiveUser>(
    ActiveUser.None(),
  );
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        {activeUser.caseOf({
          None: () => <LoginForm onLogin={updateUser} />,
          User: (_, __, email) => (
            <UserContext.Provider value={activeUser}>
              <View style={styles.headerContainer}>
                <Text style={Fonts.title}>Hello, {email}!</Text>
                <SettingsButton />
              </View>
              <Tab.Navigator>
                <Tab.Screen name="Waitlist" component={Waitlist} />
                <Tab.Screen name="Tables" component={Tables} />
              </Tab.Navigator>
            </UserContext.Provider>
          ),
        })}
      </View>
    </NavigationContainer>
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

export default App;
