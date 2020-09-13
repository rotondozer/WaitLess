import "react-native-get-random-values"; // needs to be above uuid import
// import { ToastAndroid, Alert } from "react-native";
// import { v4 as uuid } from "uuid";
import { Maybe } from "seidr";
import { Table as Table_, ListTablesQuery } from "types";

import { API, graphqlOperation } from "aws-amplify";
import { listTables } from "graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";

const maybeNull = Maybe.fromNullable;

export type Table = Table_;

// -- GETTERS

export async function fetchAll(): Promise<Array<Table>> {
  console.log("Fetching Tables...");
  try {
    const tablesResult = (await API.graphql(
      graphqlOperation(listTables),
    )) as GraphQLResult<ListTablesQuery>;

    const tables = maybeNull(tablesResult.data)
      .flatMap(d => maybeNull(d.listTables))
      .flatMap(lt => maybeNull(lt.items as Array<Table>))
      .getOrElse([]);

    return Promise.resolve(tables);
  } catch (err) {
    const error = JSON.stringify(err);
    console.log("Failed Fetching Tables", error);
    return Promise.reject(error);
  }
}

// -- HELPERS

export function isOccupied(table: Table): boolean {
  return maybeNull(table.parties)
    .flatMap(ps => maybeNull(ps.items))
    .map(parties =>
      parties.some(party =>
        maybeNull(party)
          .map<boolean>(p => !p.departedAt)
          .getOrElse(false),
      ),
    )
    .getOrElse(false);
}
