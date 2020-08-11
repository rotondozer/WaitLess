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

enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const [activeUser, updateUser] = useState<ActiveUser.ActiveUser>(
    ActiveUser.None(),
  );
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        {activeUser.caseOf({
          None: () => <LoginForm onLogin={updateUser} />,
          User: (userId, token, email) => (
            <UserContext.Provider value={activeUser}>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  initialParams={{ email }}
                />
                <Stack.Screen
                  name="Settings"
                  component={Settings}
                  initialParams={{ userId, token, email }}
                />
              </Stack.Navigator>
            </UserContext.Provider>
          ),
        })}
      </View>
    </NavigationContainer>
  );
}

export default App;
