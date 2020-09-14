import React from "react";
import { Text, View } from "react-native";
import { Colors, Fonts } from "styles";
import { Table } from "api";

function TableDetails(table: Table.Table): JSX.Element {
  // TODO: getPartiesForTable()
  return (
    <View style={{ flex: 1, backgroundColor: Colors.blue }}>
      <Text style={Fonts.title}>Table Details</Text>
      <Text style={Fonts.text2}>{table.name}</Text>
    </View>
  );
}

export default TableDetails;
