import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Layouts } from "styles";
import { useFocusEffect } from "@react-navigation/native";
import { Table, Party } from "api";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "types";
import TableSquare from "./TableSquare";

type Props = StackScreenProps<RootStackParamList, "AvailableTables">;

function AvailableTables(props: Props): JSX.Element {
  const [tables, updateTables] = useState<Array<Table.Table>>([]);
  const { navigation } = props;
  const { party } = props.route.params;

  useFocusEffect(
    useCallback(() => {
      Table.getAllAvailable()
        .then(updateTables)
        .catch(e => console.log("fetchParties failed", JSON.stringify(e)));
    }, []),
  );

  return (
    <View style={[Layouts.container, styles.container]}>
      {tables.map(table => (
        <TableSquare
          table={table}
          key={table.id}
          onPress={() =>
            Table.updateAsOccupied(table.id)
              .then(t => Party.seatAt(t.id, party.id))
              .then(p => Party.toastSuccess(Party.Action.SEAT, p))
              .then(() => navigation.goBack())
              .catch(e => Party.alertFailure(Party.Action.SEAT, e))
          }
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});

export default AvailableTables;
