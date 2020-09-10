/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getParty = /* GraphQL */ `
  query GetParty($id: ID!, $waitingSince: AWSDateTime!) {
    getParty(id: $id, waitingSince: $waitingSince) {
      email
      estWait
      guestCount
      id
      isWaiting
      name
      notes
      phone
      seatedAt
      table {
        description
        id
        maxSeats
        minSeats
        name
        author
      }
      waitingSince
      author
    }
  }
`;
export const getTable = /* GraphQL */ `
  query GetTable($id: ID!, $maxSeats: Int!) {
    getTable(id: $id, maxSeats: $maxSeats) {
      description
      id
      maxSeats
      minSeats
      name
      author
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
        email
        estWait
        guestCount
        id
        isWaiting
        name
        notes
        phone
        seatedAt
        waitingSince
        author
      }
      nextToken
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
        description
        id
        maxSeats
        minSeats
        name
        author
      }
      nextToken
    }
  }
`;
