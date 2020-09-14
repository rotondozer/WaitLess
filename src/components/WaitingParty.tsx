import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  StyleProp,
  ImageStyle,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { WaitlistStackParamList } from "types";
import { Fonts, Colors } from "styles";
import { Button } from "common";
import { Party } from "api";

interface Props {
  navigation: StackNavigationProp<WaitlistStackParamList, "Waitlist">;
  party: Party.Party;
}
function PartyWaiting(props: Props): JSX.Element {
  const { navigation, party } = props;

  return (
    <View style={styles.guestCount} key={party.id}>
      <View style={styles.topContainer}>
        <View style={styles.nameContainer}>
          <Text style={Fonts.title}>{party.name}</Text>
        </View>
        <Pressable
          style={editPartyButtonStyle}
          onPress={() => navigation.navigate("EditPartyForm", { party })}>
          <Text style={[Fonts.condensedText, { paddingRight: 5 }]}>
            {party.guestCount} {party.guestCount > 1 ? "people" : "person"}
          </Text>

          <Image
            style={styles.editIcon}
            source={require("src/assets/edit.png")}
          />
        </Pressable>
      </View>

      <View style={styles.bottomContainer}>
        <Button
          text="Seat"
          onPress={() => navigation.navigate("AvailableTables", { party })}
          style={[styles.actionButtons, styles.seatButton]}
          textStyle={[Fonts.text2, styles.seatText]}
        />
      </View>
    </View>
  );
}

// -- PRIVATE

function editPartyButtonStyle({
  pressed,
}: {
  pressed: boolean;
}): StyleProp<ImageStyle> {
  return pressed
    ? [
        styles.guestCountContainer,
        { backgroundColor: Colors.blackish.concat("70") },
      ]
    : styles.guestCountContainer;
}

// -- STYLES

const styles = StyleSheet.create({
  guestCount: {
    height: 110,
    width: "100%",
    marginTop: 4,
    padding: 10,
    backgroundColor: Colors.tanOpaque,
    borderColor: Colors.red420,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameContainer: {
    flex: 0.7,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  guestCountContainer: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  actionButtons: {
    marginHorizontal: 4,
    backgroundColor: Colors.whitish,
    borderWidth: 1,
  },
  seatButton: {
    borderColor: Colors.sageGray,
  },
  seatText: {
    color: Colors.sageGray,
  },
  editIcon: {
    height: 20,
    width: 20,
  },
});

export default PartyWaiting;
