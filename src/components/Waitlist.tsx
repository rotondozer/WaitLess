import React, {
  ReactNode,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { Maybe, Nothing } from "seidr";

import { UserContext } from "state/user_context";
import { Layouts, Colors } from "styles";
import { WaitlistStackParamList } from "types";
import { Party } from "api";
import { Button } from "common";
import PartyWaiting from "./WaitingParty";

const maybeNull = Maybe.fromNullable;

type PartiesState = Maybe<Array<Party.Party>>;

// -- VIEW

type Props = StackScreenProps<WaitlistStackParamList, "Waitlist">;

function WaitList({ navigation }: Props): JSX.Element {
  const [parties, updateParties] = useState<PartiesState>(Nothing());

  const { user } = useContext(UserContext);

  useFocusEffect(
    useCallback(() => {
      console.log("Fetching Parties...");
      Party.fetchPartiesWaiting()
        .then(updateParties)
        .catch(e => console.log("fetchParties failed", JSON.stringify(e)));
    }, []),
  );

  // TODO: callback isntead of sub?
  useEffect(() => {
    function partyUpdater(
      prevState: PartiesState,
      party: Party.Party,
    ): PartiesState {
      console.log(`Adding party '${party.name}' to state`);
      return prevState.map(ps => ps.concat(party));
    }

    const subscription = Party.partyCreationSub().subscribe({
      next: data => {
        console.log("New party received via subscription", data);

        maybeNull(data.value)
          .flatMap(v => maybeNull(v.data))
          .flatMap(d => maybeNull(d.onCreateParty))
          .map(p =>
            updateParties(prevState =>
              partyUpdater(prevState, p as Party.Party),
            ),
          );
      },
    });

    return Party.unsubscribeToPartyCreation(subscription);
  }, []); // Passing an empty deps array tells React to only run this on mount

  function onSeatOrRemoveParty(party: Party.Party): Party.Party {
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
            ps
              .map(party => ({ party, onSeatOrRemoveParty, navigation }))
              .map(PartyWaiting),
        })}
      </ScrollView>
      <AddPartyButton />
    </View>
  );
}

// -- PRIVATE

function AddPartyButton(): JSX.Element {
  const navigation = useNavigation<
    StackNavigationProp<WaitlistStackParamList, "Waitlist">
  >();

  return (
    <Button
      text="Add Party"
      onPress={() => navigation.navigate("AddPartyForm")}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderBottomColor: Colors.blue,
    borderBottomWidth: 2,
  },
});

export default WaitList;
