import "react-native-gesture-handler"; // Needs to stay above everything else
import React, { useState } from "react";
import { View } from "react-native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginForm from "./src/LoginForm";
import Home from "./src/Home";
import Settings from "./src/Settings";
import { UserContext } from "./state/user_context";
import { ActiveUser, RootStackParamList } from "./types";

// -- NAVIGATOR

enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

// -- ROOT VIEW

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
            <UserContext.Provider value={{ user: activeUser, updateUser }}>
              <Stack.Navigator
                screenOptions={({ route }) => ({
                  headerShown: route.name === "Settings",
                })}>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  initialParams={{ email }}
                />
                <Stack.Screen name="Settings" component={Settings} />
              </Stack.Navigator>
            </UserContext.Provider>
          ),
        })}
      </View>
    </NavigationContainer>
  );
}

export default App;
