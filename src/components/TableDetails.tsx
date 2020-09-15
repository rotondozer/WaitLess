import React from "react";
import { Text, View } from "react-native";
import { Colors, Fonts } from "styles";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "types";
import { Maybe } from "seidr";

type Props = StackScreenProps<RootStackParamList, "TableDetails">;

function TableDetails(props: Props): JSX.Element {
  const maybeTable = Maybe.fromNullable(props.route.params.table);

  return maybeTable.caseOf({
    Nothing: () => <Text>Something went wrong. Please go back</Text>,
    Just: table => (
      <View style={{ flex: 1, backgroundColor: Colors.blue }}>
        <Text style={Fonts.title}>Table Details</Text>
        <Text style={Fonts.text2}>{table.name}</Text>
        <Text>Seating History</Text>
        {table.parties?.items?.map(
          party =>
            party && (
              <>
                <Text>{party.name}</Text>
                <Text>Seated At: {party.seatedAt}</Text>
              </>
            ),
        )}
      </View>
    ),
  });
}

export default TableDetails;
