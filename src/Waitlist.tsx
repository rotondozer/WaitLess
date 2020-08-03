import React, { useEffect, useState, useContext } from "react";
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
      {parties.caseOf({
        Nothing: () => [<Text key={0}>No Parties on the Waitlist!</Text>], // React.Children type or something to get rid of `[]`
        Just: ps =>
          ps.map(({ id, name, size }) => (
            <Text key={id}>
              Name: {name}, Size: {size}
            </Text>
          )),
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "pink" },
});

export default WaitList;
