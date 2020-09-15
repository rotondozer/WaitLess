import "react-native-get-random-values"; // needs to be above uuid import
// import { ToastAndroid, Alert } from "react-native";
// import { v4 as uuid } from "uuid";
import { Maybe } from "seidr";
import {
  Table as Table_,
  ListTablesQuery,
  ModelTableFilterInput,
  UpdateTableInput,
  UpdateTableMutation,
  GetTableQuery,
  GetTableQueryVariables,
} from "types";

import { API, graphqlOperation } from "aws-amplify";
import { listTables, getTable } from "graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";
import { updateTable } from "graphql/mutations";

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

export function getAllAvailable(): Promise<Array<Table>> {
  return getTables({ isOccupied: { eq: false } });
}

export function getAll(): Promise<Array<Table>> {
  return getTables();
}

/**
 * Fetch a single Table, including all parties associated with that Table.
 */
export async function getOne(tableId: string): Promise<Table> {
  const getVars: GetTableQueryVariables = { id: tableId };

  try {
    const tablesResult = (await API.graphql(
      graphqlOperation(getTable, getVars),
    )) as GraphQLResult<GetTableQuery>;

    return maybeNull(tablesResult.data)
      .flatMap(d => maybeNull(d.getTable))
      .map(t => Promise.resolve(t as Table))
      .getOrElse(Promise.reject("null value returned"));
  } catch (err) {
    const error = JSON.stringify(err);
    console.log("Failed Fetching Table with id: " + tableId, error);

    return Promise.reject(error);
  }
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
    console.log("Failed fetching Tables", error);

    return Promise.reject(error);
  }
}

// -- UPDATERS

export function updateAsOccupied(tableId: string): Promise<Table> {
  return update({ id: tableId, isOccupied: true });
}

async function update(input: UpdateTableInput): Promise<Table> {
  console.log("Updating Tables...");

  try {
    const tablesResult = (await API.graphql(
      graphqlOperation(updateTable, { input }),
    )) as GraphQLResult<UpdateTableMutation>;

    return maybeNull(tablesResult.data)
      .flatMap(d => maybeNull(d.updateTable))
      .map(t => Promise.resolve(t as Table))
      .getOrElse(Promise.reject("null value returned"));
  } catch (err) {
    const error = JSON.stringify(err);
    console.log("Failed updating Table", error);

    return Promise.reject(error);
  }
}
