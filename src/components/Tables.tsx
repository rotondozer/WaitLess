import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Layouts } from "styles";
import { useFocusEffect } from "@react-navigation/native";
import { Table } from "api";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "types";
import TableSquare from "./TableSquare";

type Props = StackScreenProps<RootStackParamList, "Home">;

function Tables(props: Props): JSX.Element {
  const [tables, updateTables] = useState<Array<Table.Table>>([]);
  const { navigation } = props;

  useFocusEffect(
    useCallback(() => {
      Table.getAll()
        .then(updateTables)
        .catch(e => console.log("fetchParties failed", JSON.stringify(e)));
    }, []),
  );

  return (
    <View style={[Layouts.container, styles.container]}>
      {tables.map(table => (
        <TableSquare
          key={table.id}
          table={table}
          onPress={() => navigation.navigate("TableDetails", { table })}
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

export default Tables;
