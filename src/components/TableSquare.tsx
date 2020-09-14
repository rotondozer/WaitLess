import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Table } from "api";
import { Colors } from "styles";

interface TableSquareProps {
  table: Table.Table;
  onPress: () => void;
}
function TableSquare({ table, onPress }: TableSquareProps): JSX.Element {
  const occupiedStyle = table.isOccupied
    ? styles.occupiedTable
    : styles.availableTable;

  return (
    <Pressable onPress={onPress} style={[styles.table, occupiedStyle]}>
      <Text>ID: {table.id}</Text>
      <Text>{table.name}</Text>
      <Text>
        Seats {table.minSeats} - {table.maxSeats} guests.
      </Text>
    </Pressable>
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

export default TableSquare;
