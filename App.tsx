import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Text } from "react-native";
import LoginForm from "./src/LoginForm";
import * as ActiveUser from "./types/active_user";

const UserContext = React.createContext<ActiveUser.ActiveUser>(
  ActiveUser.None(),
);

const App = () => {
  const [activeUser, updateUser] = useState<ActiveUser.ActiveUser>(
    ActiveUser.None(),
  );
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {activeUser.caseOf({
          None: () => <LoginForm onLogin={updateUser} />,
          User: (id, _) => (
            <View style={{ flex: 1, backgroundColor: "green" }}>
              <Text>Logged in as: {id}</Text>
            </View>
          ),
        })}
      </SafeAreaView>
    </>
  );
};

export default App;
