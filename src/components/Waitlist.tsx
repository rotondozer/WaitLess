import React, { ReactNode, useCallback, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Maybe, Nothing } from "seidr";

import { UserContext } from "state/user_context";
import { Layouts, Colors } from "styles";
import { WaitlistStackParamList } from "types";
import { Party } from "api";
import { Button } from "common";
import PartyWaiting from "./WaitingParty";

type PartiesState = Maybe<Array<Party.Party>>;

// -- VIEW

type Props = StackScreenProps<WaitlistStackParamList, "Waitlist">;

function WaitList({ navigation }: Props): JSX.Element {
  const [parties, updateParties] = useState<PartiesState>(Nothing());

  const { user } = useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      Party.fetchPartiesWaiting()
        .then(updateParties)
        .catch(e => console.log("fetchParties failed", JSON.stringify(e)));
    }, []),
  );

  function addPartyToState(party: Party.Party): Party.Party {
    updateParties(prevState => prevState.map(ps => ps.concat(party)));
    return party;
  }

  function removePartyFromState(party: Party.Party): Party.Party {
    updateParties(prevState =>
      prevState.map(ps => ps.filter(p => p.id !== party.id)),
    );
    return party;
  }

  return (
    <View style={Layouts.container}>
      <ScrollView alwaysBounceVertical style={styles.listContainer}>
        {parties.caseOf<ReactNode>({
          Nothing: () => <Text>No Parties on the Waitlist!</Text>,
          Just: ps =>
            ps.map(party => (
              <PartyWaiting
                party={party}
                navigation={navigation}
                onSeatOrRemoveParty={removePartyFromState}
              />
            )),
        })}
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
