/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTable = /* GraphQL */ `
  query GetTable($id: ID!, $maxSeats: Int!) {
    getTable(id: $id, maxSeats: $maxSeats) {
      id
      name
      maxSeats
      minSeats
      description
    }
  }
`;
export const listTables = /* GraphQL */ `
  query ListTables(
    $filter: TableTableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        maxSeats
        minSeats
        description
      }
      nextToken
    }
  }
`;
export const getParty = /* GraphQL */ `
  query GetParty($id: ID!, $waitingSince: AWSTime!) {
    getParty(id: $id, waitingSince: $waitingSince) {
      id
      name
      guestCount
      isWaiting
      waitingSince
      phone
      email
      notes
      table {
        id
        name
        maxSeats
        minSeats
        description
      }
    }
  }
`;
export const listParties = /* GraphQL */ `
  query ListParties(
    $filter: TablePartyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listParties(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        guestCount
        isWaiting
        waitingSince
        phone
        email
        notes
      }
      nextToken
    }
  }
`;
