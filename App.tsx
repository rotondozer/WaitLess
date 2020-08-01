import "react-native-gesture-handler";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LoginForm from "./src/LoginForm";
import * as ActiveUser from "./types/active_user";

const UserContext = React.createContext<ActiveUser.ActiveUser>(
  ActiveUser.None(),
);

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
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Tables" component={Tables} />
                <Tab.Screen name="Waitlist" component={Waitlist} />
                <Tab.Screen name="Settings" component={Settings} />
              </Tab.Navigator>
            </UserContext.Provider>
          ),
        })}
      </View>
    </NavigationContainer>
  );
}

// Placeholder componentws

const Home = () => <View style={{ flex: 1, backgroundColor: "green" }} />;

const Tables = () => <View style={{ flex: 1, backgroundColor: "blue" }} />;

const Waitlist = () => <View style={{ flex: 1, backgroundColor: "pink" }} />;

const Settings = () => (
  <UserContext.Consumer>
    {activeUser =>
      activeUser.caseOf({
        None: () => null,
        User: (id, token, email) => (
          <View style={{ flex: 1, backgroundColor: "yellow" }}>
            <Text>Logged in as: {email}</Text>
            <Text>With id: {id}</Text>
          </View>
        ),
      })
    }
  </UserContext.Consumer>
);

// -- STYLES

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
