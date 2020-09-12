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
          email
          estWait
          guestCount
          id
          isWaiting
          name
          notes
          phone
          seatedAt
          departedAt
          tableID
          waitingSince
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
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
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getParty = /* GraphQL */ `
  query GetParty($id: ID!) {
    getParty(id: $id) {
      email
      estWait
      guestCount
      id
      isWaiting
      name
      notes
      phone
      seatedAt
      departedAt
      tableID
      waitingSince
      createdAt
      updatedAt
      owner
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
        email
        estWait
        guestCount
        id
        isWaiting
        name
        notes
        phone
        seatedAt
        departedAt
        tableID
        waitingSince
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
