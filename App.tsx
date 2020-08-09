import "react-native-gesture-handler";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import LoginForm from "./src/LoginForm";
import Settings from "./src/Settings";
import Waitlist from "./src/Waitlist";
import { UserContext } from "./state/user_context";
import * as ActiveUser from "./types/active_user";

const Tab = createMaterialTopTabNavigator();

function App(): JSX.Element {
  const [activeUser, updateUser] = useState<ActiveUser.ActiveUser>(
    ActiveUser.None(),
  );
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {activeUser.caseOf({
          None: () => <LoginForm onLogin={updateUser} />,
          User: (_, __, email) => (
            <UserContext.Provider value={activeUser}>
              <View style={{ height: 50 }}>
                <Text>Hello, {email}!</Text>
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

// Placeholder components

const Home = () => <View style={{ flex: 1, backgroundColor: "green" }} />;

const Tables = () => <View style={{ flex: 1, backgroundColor: "blue" }} />;

// -- STYLES

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
