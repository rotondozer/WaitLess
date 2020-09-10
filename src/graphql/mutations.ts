/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createParty = /* GraphQL */ `
  mutation CreateParty($input: CreatePartyInput!) {
    createParty(input: $input) {
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
export const createTable = /* GraphQL */ `
  mutation CreateTable($input: CreateTableInput!) {
    createTable(input: $input) {
      description
      id
      maxSeats
      minSeats
      name
      author
    }
  }
`;
export const deleteParty = /* GraphQL */ `
  mutation DeleteParty($input: DeletePartyInput!) {
    deleteParty(input: $input) {
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
export const deleteTable = /* GraphQL */ `
  mutation DeleteTable($input: DeleteTableInput!) {
    deleteTable(input: $input) {
      description
      id
      maxSeats
      minSeats
      name
      author
    }
  }
`;
export const updateParty = /* GraphQL */ `
  mutation UpdateParty($input: UpdatePartyInput!) {
    updateParty(input: $input) {
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
export const updateTable = /* GraphQL */ `
  mutation UpdateTable($input: UpdateTableInput!) {
    updateTable(input: $input) {
      description
      id
      maxSeats
      minSeats
      name
      author
    }
  }
`;
