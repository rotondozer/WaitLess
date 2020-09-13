import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Layouts, Colors } from "styles";
import { useFocusEffect } from "@react-navigation/native";
import { Table } from "api";
import { StackScreenProps } from "@react-navigation/stack";
import { WaitlistStackParamList } from "types";
import { Maybe } from "seidr";

type Props = StackScreenProps<WaitlistStackParamList, "Tables">;

function Tables(props: Props): JSX.Element {
  const [tables, updateTables] = useState<Array<Table.Table>>([]);
  const showOnlyAvailable = Maybe.fromNullable(props.route.params)
    .map(p => p.showOnlyAvailable)
    .getOrElse(false);

  useFocusEffect(
    useCallback(() => {
      Table.fetchAll()
        .then(updateTables)
        .catch(e => console.log("fetchParties failed", JSON.stringify(e)));
    }, []),
  );

  const visibleTables = showOnlyAvailable
    ? tables.filter(t => !Table.isOccupied(t))
    : tables;

  return (
    <View style={[Layouts.container, styles.container]}>
      {visibleTables.map(t => (
        <TableSquare table={t} key={t.id} />
      ))}
    </View>
  );
}

interface TableSquareProps {
  table: Table.Table;
  isOccupied: boolean; // TODO: just add `isOccupied` to Table table in DB?
}
function TableSquare({ table }: { table: Table.Table }): JSX.Element {
  const occupiedStyle = table.parties;
  console.log("table.parties", occupiedStyle);
  return (
    <View style={styles.table}>
      <Text>ID: {table.id}</Text>
      <Text>{table.name}</Text>
      <Text>
        Seats {table.minSeats} - {table.maxSeats} guests.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  table: {
    height: 180,
    width: 180,
    borderRadius: 5,
    borderColor: Colors.darkRed,
    borderWidth: 1,
    marginVertical: 4,
  },
  occupiedTable: {
    backgroundColor: Colors.red420.concat("80"),
  },
  availableTable: {
    backgroundColor: Colors.sageGray.concat("80"),
  },
});

export default Tables;
