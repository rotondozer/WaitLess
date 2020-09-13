/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTable = /* GraphQL */ `
  query GetTable($id: ID!) {
    getTable(id: $id) {
      description
      id
      maxSeats
      minSeats
      name
      parties {
        items {
          estWait
          guestCount
          id
          name
          notes
          phone
          seatedAt
          departedAt
          tableId
          waitingSince
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTables = /* GraphQL */ `
  query ListTables(
    $filter: ModelTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        description
        id
        maxSeats
        minSeats
        name
        parties {
          nextToken
          items {
            name
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getParty = /* GraphQL */ `
  query GetParty($id: ID!) {
    getParty(id: $id) {
      estWait
      guestCount
      id
      name
      notes
      phone
      seatedAt
      departedAt
      tableId
      waitingSince
      createdAt
      updatedAt
    }
  }
`;
export const listPartys = /* GraphQL */ `
  query ListPartys(
    $filter: ModelPartyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPartys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        estWait
        guestCount
        id
        name
        notes
        phone
        seatedAt
        departedAt
        tableId
        waitingSince
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
