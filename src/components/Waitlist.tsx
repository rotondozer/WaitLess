import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

import { Layouts, Colors } from "styles";
import { WaitlistStackParamList } from "types";
import { Party } from "api";
import { Button } from "common";
import WaitingParty from "./WaitingParty";

// -- VIEW

type Props = StackScreenProps<WaitlistStackParamList, "Waitlist">;

function WaitList({ navigation }: Props): JSX.Element {
  const [parties, updateParties] = useState<Array<Party.Party>>([]);

  useFocusEffect(
    useCallback(() => {
      Party.fetchPartiesWaiting()
        .then(updateParties)
        .catch(e => console.log("fetchParties failed", JSON.stringify(e)));
    }, []),
  );

  function addPartyToState(party: Party.Party): Party.Party {
    updateParties(ps => ps.concat(party));
    return party;
  }

  function removePartyFromState(party: Party.Party): Party.Party {
    updateParties(ps => ps.filter(p => p.id !== party.id));
    return party;
  }

  return (
    <View style={Layouts.container}>
      <ScrollView alwaysBounceVertical style={styles.listContainer}>
        {parties.length > 0 ? (
          parties.map(party => (
            <WaitingParty
              key={party.id}
              party={party}
              navigation={navigation}
              onSeatOrRemoveParty={removePartyFromState}
            />
          ))
        ) : (
          <Text>No Parties on the Waitlist!</Text>
        )}
      </ScrollView>
      <Button
        text="Add Party"
        onPress={() =>
          navigation.navigate("AddPartyForm", { onAddParty: addPartyToState })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderBottomColor: Colors.blue,
    borderBottomWidth: 2,
  },
});

export default WaitList;
