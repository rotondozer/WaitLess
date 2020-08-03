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

function PartyWaiting(party: Party.Party): JSX.Element {
  const { id, name, size } = party;
  return (
    <View key={id}>
      <Text>
        Name: {name}, Size: {size}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "pink" },
});

export default WaitList;
