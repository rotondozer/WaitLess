import React, { useState } from "react";
import { Text, View, StyleSheet, Alert, ToastAndroid } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Party } from "api";
import { WithUserContext, withUserContext } from "../state/user_context";
import { Input, Button } from "../common";
import {
  ParseInt,
  Time,
  WaitlistStackParamList,
  CreatePartyMutation,
} from "types";
import { Fonts, Layouts, Colors } from "../styles";

import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { createParty } from "graphql/mutations";

type Navigation = StackNavigationProp<WaitlistStackParamList, "AddPartyForm">;

// -- VIEW

interface Props {
  navigation: Navigation;
  route: RouteProp<WaitlistStackParamList, "AddPartyForm">;
}

function AddPartyForm(props: WithUserContext<Props>): JSX.Element {
  const { user, navigation } = props;

  const [name, updateName] = useState("New Party");
  const [guestCount, updateGuestCount] = useState(1);
  const [estWait, updateEstWait] = useState(Time.reset());
  const [notes, updateNotes] = useState("");

  return (
    <View style={Layouts.container}>
      <Text style={styles.title}>Enter Party Details</Text>
      <View style={styles.partyFormContainer}>
        <Input
          withLabel="Name"
          value={name}
          selectTextOnFocus
          onChangeText={updateName}
        />
        <View style={styles.guestsAndWaitContainer}>
          <View style={styles.inputWithSuffixContainer}>
            <Input
              withLabel="# Guests"
              keyboardType="number-pad"
              selectTextOnFocus
              value={guestCount.toString()}
              onChangeText={v =>
                ParseInt.parse(v).caseOf({
                  EmptyString: () => updateGuestCount(1),
                  NaN: () => Alert.alert("Needs to be a number!"),
                  Parsed: updateGuestCount,
                })
              }
              style={styles.guestCountInput}
            />
            <Text style={styles.suffix}>
              {guestCount === 1 ? "person" : "people"}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Input
              withLabel="Estimated Wait"
              keyboardType="number-pad"
              value={Time.format(estWait)}
              onChangeText={t => updateEstWait(Time.fromNumericalString(t))}
              style={styles.estWaitInput}
            />
            <Text style={styles.suffix}>{estWait[1] > 0 ? "hrs" : "min"}</Text>
          </View>
        </View>

        <Input
          placeholder="Any special requests?"
          value={notes}
          onChangeText={updateNotes}
          style={styles.notesInput}
          multiline
          editable
          maxLength={400}
          numberOfLines={4}
        />
      </View>

      <Button
        onPress={() =>
          onCreateParty(name, guestCount, estWait)
            .then(p => {
              toastSuccess(p.name);
              navigation.goBack();
            })
            .catch(alertFailedCreation)
        }
        text="Add to Waitlist"
      />
    </View>
  );
}

// -- PRIVATE

function alertFailedCreation(e: string): void {
  Alert.alert(`Failed creating party!\n${e}`);
}

function toastSuccess(n: string): void {
  ToastAndroid.show(
    `${n} successfully added to the waitlist!`,
    ToastAndroid.SHORT,
  );
}

async function onCreateParty(
  name: string,
  guestCount: number,
  estWait: Time.Time,
): Promise<Party.Party> {
  try {
    const createResult = (await API.graphql(
      graphqlOperation(createParty, {
        input: Party.createInput(name, guestCount, estWait),
      }),
    )) as GraphQLResult<CreatePartyMutation>;

    if (createResult.data) {
      if (createResult.data.createParty) {
        return Promise.resolve(createResult.data.createParty as Party.Party);
      }
    }
  } catch (err) {
    console.log("Failed creating party", err);
    Promise.reject("");
  }

  return Promise.reject("");
}

// -- STYLES

const styles = StyleSheet.create({
  title: {
    ...Fonts.title,
    marginLeft: 10,
  },
  partyFormContainer: {
    backgroundColor: Colors.tan,
    padding: 6,
    margin: 10,
    borderColor: Colors.red420,
    borderWidth: 1,
    borderRadius: 3,
  },
  guestsAndWaitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputWithSuffixContainer: {
    flexDirection: "row",
  },
  estWaitInput: {
    textAlign: "center",
  },
  guestCountInput: {
    textAlign: "center",
  },
  notesInput: {
    textAlignVertical: "top",
  },
  suffix: {
    alignSelf: "flex-end",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
});

export default withUserContext(AddPartyForm);
