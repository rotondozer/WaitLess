import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ToastAndroid,
  Image,
  Pressable,
  StyleProp,
  ImageStyle,
} from "react-native";
import { Maybe } from "seidr";

import { Party, UpdatePartyMutation, DeletePartyMutation } from "types";
import { Fonts, Colors } from "styles";
import { Button } from "common";

import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { updateParty, deleteParty } from "graphql/mutations";

/**
 * TODO: Make entire cell touchable with just name and size, then push new screen onPress
 */
interface Props {
  party: Party;
  onSeatOrRemoveParty: (p: Party) => Party;
}
function PartyWaiting({ party, onSeatOrRemoveParty }: Props): JSX.Element {
  const { id, name, guestCount } = party;
  return (
    <View style={styles.guestCount} key={id}>
      <View style={styles.topContainer}>
        <View style={styles.nameContainer}>
          <Text style={Fonts.title}>{name}</Text>
        </View>
        <Pressable
          style={editPartyButtonStyle}
          onPress={() => {
            console.log("EDIT PRESS");
          }}>
          <Text style={[Fonts.condensedText, { paddingRight: 5 }]}>
            {guestCount} {guestCount > 1 ? "people" : "person"}
          </Text>

          <Image
            style={styles.editIcon}
            source={require("src/assets/edit.png")}
          />
        </Pressable>
      </View>

      <View style={styles.bottomContainer}>
        <Button
          text="X"
          onPress={() =>
            removePartyFromWait(party)
              .then(onSeatOrRemoveParty)
              .then(p => toastSuccess(Action.REMOVE, p))
              .catch(e => alertFailure(Action.REMOVE, e))
          }
          style={[styles.actionButtons, styles.xButton]}
          textStyle={[Fonts.text2, styles.xText]}
        />
        <Button
          text="Seat"
          onPress={() =>
            seatParty(party)
              .then(onSeatOrRemoveParty)
              .then(p => toastSuccess(Action.SEAT, p))
              .catch(e => alertFailure(Action.SEAT, e))
          }
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

enum Action {
  SEAT,
  REMOVE,
}

function alertFailure(action: Action, e: string): void {
  Alert.alert(
    `Failed ${action === Action.SEAT ? "seating" : "removing"} party!\n${e}`,
  );
}

function toastSuccess(action: Action, p: Party): void {
  ToastAndroid.show(
    `${p.name} has been ${
      action === Action.SEAT ? "seated!" : "removed from the waitlist."
    }`,
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
    const err = JSON.stringify(error);
    console.log(`seating party ${party.name} failed`, err);
    return Promise.reject(err);
  }
}

/**
 * Removing a party from the waitlist is a simple delete for now.
 * Potentially, a `removal` could archive the party so the record is not lost,
 * and this aggregated data could be useful for users to understand the whens/whys
 * parties were removed without being seated (e.g. the wait was too long).
 */
async function removePartyFromWait(party: Party): Promise<Party> {
  const { id, waitingSince } = party;
  try {
    const removal = (await API.graphql(
      graphqlOperation(deleteParty, { input: { id, waitingSince } }),
    )) as GraphQLResult<DeletePartyMutation>;

    return Maybe.fromNullable(removal.data)
      .flatMap(d => Maybe.fromNullable(d.deleteParty))
      .map(Promise.resolve)
      .getOrElse(Promise.reject("")) as Promise<Party>;
  } catch (error) {
    const err = JSON.stringify(error);
    console.log(`deleting party ${party.name} failed`, err);
    return Promise.reject(err);
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
    borderRadius: 5,
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
  editIcon: {
    height: 20,
    width: 20,
  },
});

export default PartyWaiting;
