import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";

import { User } from "api";
import { Colors, Fonts } from "styles";
import { RootStackParamList } from "types";
import Waitlist from "./Waitlist";
import Tables from "./Tables";

// -- NAVIGATOR

const Tab = createMaterialTopTabNavigator();

type Navigation = StackNavigationProp<RootStackParamList, "Home">;

// -- VIEW

type Props = StackScreenProps<RootStackParamList, "Home">;

function Home(props: Props): JSX.Element {
  const [user, updateUser] = useState("");
  const { navigation } = props;

  useEffect(() => {
    User.getCurrentUser(updateUser);
  }, []);

  return (
    <>
      <StatusBar backgroundColor={Colors.blueGray} barStyle="dark-content" />
      {
        <View style={styles.headerContainer}>
          <Text style={Fonts.condensedText}>Hello, {user}!</Text>
          <SettingsButton navigation={navigation} />
        </View>
      }
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: Fonts.tabBar,
          style: styles.tabBar,
          indicatorStyle: styles.tabBarIndicator,
        }}>
        <Tab.Screen name="Waitlist" component={Waitlist} />
        <Tab.Screen name="Tables" component={Tables} />
      </Tab.Navigator>
    </>
  );
}

// -- PRIVATE

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
