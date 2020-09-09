import React from "react";
import { View, Text, StyleSheet, Alert, ToastAndroid } from "react-native";
import { Party, UpdatePartyMutation } from "types";
import { Fonts, Colors } from "styles";
import { Button } from "common";

import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { updateParty } from "graphql/mutations";

/**
 * TODO: Make entire cell touchable with just name and size, then push new screen onPress
 */
interface Props {
  party: Party;
  onSeatParty: (p: Party) => Party;
}
function PartyWaiting({ party, onSeatParty }: Props): JSX.Element {
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
          onPress={() =>
            seatParty(party)
              .then(onSeatParty)
              .then(toastSuccess)
              .catch(alertFailedCreation)
          }
          style={[styles.actionButtons, styles.seatButton]}
          textStyle={[Fonts.text2, styles.seatText]}
        />
      </View>
    </View>
  );
}

// -- PRIVATE

function alertFailedCreation(e: string): void {
  Alert.alert(`Failed seating party!\n${e}`);
}

function toastSuccess(p: Party): void {
  ToastAndroid.show(
    `${p.name} has been seated and removed from the waitlist!`,
    ToastAndroid.SHORT,
  );
}

// TODO: include table id when seating party
async function seatParty(party: Party): Promise<Party> {
  try {
    const thing = (await API.graphql(
      graphqlOperation(updateParty, {
        input: { ...party, isWaiting: false },
      }),
    )) as GraphQLResult<UpdatePartyMutation>;

    return Promise.resolve(thing.data?.updateParty as Party);
  } catch (error) {
    console.log(
      `seating party with id ${party.id} failed`,
      JSON.stringify(error),
    );
    return Promise.reject(error);
  }
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
