import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Layouts } from "styles";
import { useFocusEffect } from "@react-navigation/native";
import { Table } from "api";

function Tables(): JSX.Element {
  const [tables, updateTables] = useState<Array<Table.Table>>([]);

  useFocusEffect(
    useCallback(() => {
      Table.fetchAll()
        .then(updateTables)
        .catch(e => console.log("fetchParties failed", JSON.stringify(e)));
    }, []),
  );
  return (
    <View style={Layouts.container}>
      {tables.map(t => (
        <TableItem table={t} />
      ))}
    </View>
  );
}

function TableItem({ table }: { table: Table.Table }): JSX.Element {
  return (
    <View style={styles.table}>
      <Text>{table.name}</Text>
      <Text>
        Seats {table.minSeats} - {table.maxSeats} guests.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    height: 200,
    width: 200,
    borderRadius: 5,
  },
});

export default Tables;
