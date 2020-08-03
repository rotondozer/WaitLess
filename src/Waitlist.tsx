import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";

import UserContext from "../state/user_context";
import * as Party from "../api/party";

function WaitList(): JSX.Element {
  const [parties, updateParties] = useState<Array<Party.Party>>([]); // TODO: maybe!!!!!

  const user = useContext(UserContext);

  useEffect(() => {
    Party.getAll(user)
      .then(res => updateParties(res.data.parties))
      .catch(err => console.warn(err));
  }, [user]);

  return (
    <View style={styles.container}>
      {parties.map(party => (
        <Text>
          Name: {party.name}, Size: {party.size}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "pink" },
});

export default WaitList;
