/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTable = /* GraphQL */ `
  mutation CreateTable($input: CreateTableInput!) {
    createTable(input: $input) {
      id
      name
      maxSeats
      minSeats
      description
    }
  }
`;
export const updateTable = /* GraphQL */ `
  mutation UpdateTable($input: UpdateTableInput!) {
    updateTable(input: $input) {
      id
      name
      maxSeats
      minSeats
      description
    }
  }
`;
export const deleteTable = /* GraphQL */ `
  mutation DeleteTable($input: DeleteTableInput!) {
    deleteTable(input: $input) {
      id
      name
      maxSeats
      minSeats
      description
    }
  }
`;
export const createParty = /* GraphQL */ `
  mutation CreateParty($input: CreatePartyInput!) {
    createParty(input: $input) {
      id
      name
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
export const updateParty = /* GraphQL */ `
  mutation UpdateParty($input: UpdatePartyInput!) {
    updateParty(input: $input) {
      id
      name
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
export const deleteParty = /* GraphQL */ `
  mutation DeleteParty($input: DeletePartyInput!) {
    deleteParty(input: $input) {
      id
      name
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
