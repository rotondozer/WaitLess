import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Party } from "types";
import { Fonts, Colors } from "styles";
import { Button } from "common";

/**
 * TODO: Make entire cell touchable with just name and size, then push new screen onPress
 */
function PartyWaiting(party: Party): JSX.Element {
  const { id, name, guestCount } = party;
  return (
    <View style={styles.guestCount} key={id}>
      <View style={styles.topContainer}>
        <View style={styles.nameContainer}>
          <Text style={[Fonts.title]}>{name}</Text>
        </View>
        <View style={styles.guestCountContainer}>
          <Text style={Fonts.condensedText}>
            {guestCount} {guestCount > 1 ? "people" : "person"}
          </Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Button
          text="X"
          onPress={() => {}}
          style={[styles.actionButtons, styles.xButton]}
          textStyle={[Fonts.text2, styles.xText]}
        />
        <Button
          text="Seat"
          onPress={() => {}}
          style={[styles.actionButtons, styles.seatButton]}
          textStyle={[Fonts.text2, styles.seatText]}
        />
      </View>
    </View>
  );
}

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
  },
  actionButtons: {
    marginHorizontal: 4,
    backgroundColor: Colors.whitish,
    borderWidth: 1,
  },
  xButton: {
    width: 40,
    height: 40,
    borderColor: Colors.darkRed,
    elevation: 0,
    borderRadius: 40,
  },
  xText: {
    color: Colors.darkRed.concat("80"),
    fontWeight: "bold",
    fontSize: 12,
  },
  seatButton: {
    width: 270,
    borderColor: Colors.sageGray,
  },
  seatText: {
    color: Colors.sageGray,
  },
});

export default PartyWaiting;
