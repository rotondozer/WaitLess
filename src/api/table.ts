import "react-native-get-random-values"; // needs to be above uuid import
// import { ToastAndroid, Alert } from "react-native";
// import { v4 as uuid } from "uuid";
import { Maybe } from "seidr";
import { Table as Table_, ListTablesQuery, ModelTableFilterInput } from "types";

import { API, graphqlOperation } from "aws-amplify";
import { listTables } from "graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";

const maybeNull = Maybe.fromNullable;

export type Table = Table_;

/**
 * Waiting parties are associated with a "waiting table" that is not rendered, rather than
 * having tableId as null.
 * (leaving the tableId as optional also caused issues with generated the @connection)
 */
const WAITING_ID = "waiting-table-id";

// -- GETTERS

export function getAllOccupied(): Promise<Array<Table>> {
  return getTables({ isOccupied: { eq: true } });
}
/**
 * isOccupied could be undefined, so test that it's explicitly
 * *not* equal to true.
 * TODO: replace GraphQL field `isOccupied` with `status` enum?
 * enum Status {
     OCCUPIED,
     AVAILABLE,
   }
 */
export function getAllAvailable(): Promise<Array<Table>> {
  return getTables({ isOccupied: { eq: false } });
}

export function getAll(): Promise<Array<Table>> {
  return getTables();
}

const defaultFilter: ModelTableFilterInput = {
  id: { ne: WAITING_ID },
};

async function getTables(
  withFilter?: ModelTableFilterInput,
): Promise<Array<Table>> {
  console.log("Fetching Tables...");

  const filterInput = maybeNull(withFilter)
    .map(filter => ({ ...defaultFilter, and: filter }))
    .getOrElse(defaultFilter);

  try {
    const tablesResult = (await API.graphql(
      graphqlOperation(listTables, { filter: filterInput }),
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
