import React, { ReactNode, useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Maybe, Nothing } from "seidr";

import UserContext from "../state/user_context";
import * as Party from "../api/party";

type PartiesState = Maybe<Array<Party.Party>>;

function WaitList(): JSX.Element {
  const [parties, updateParties] = useState<PartiesState>(Nothing());

  const user = useContext(UserContext);

  useEffect(() => {
    Party.getAll(user).then(updateParties);
  }, [user]);

  return (
    <View style={styles.container}>
      {parties.caseOf<ReactNode>({
        Nothing: () => <Text>No Parties on the Waitlist!</Text>,
        Just: ps => ps.map(PartyWaiting),
      })}
    </View>
  );
}

/**
 * TODO: Make entire cell touchable with just name and size, then push new screen onPress
 */
function PartyWaiting(party: Party.Party): JSX.Element {
  const { id, name, size } = party;
  return (
    <View style={styles.partyContainer} key={id}>
      <View style={styles.partyNameContainer}>
        <Text>{name}</Text>
      </View>
      <View style={styles.partySizeContainer}>
        <Text>{size}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 5, backgroundColor: "pink" },

  partyContainer: {
    flexDirection: "row",
    height: 55,
    width: "100%",
    margin: 2,
    padding: 3,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 12,
  },
  partyNameContainer: {
    flex: 0.7,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  partySizeContainer: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WaitList;
