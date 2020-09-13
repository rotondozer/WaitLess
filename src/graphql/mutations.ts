/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTable = /* GraphQL */ `
  mutation CreateTable(
    $input: CreateTableInput!
    $condition: ModelTableConditionInput
  ) {
    createTable(input: $input, condition: $condition) {
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
export const updateTable = /* GraphQL */ `
  mutation UpdateTable(
    $input: UpdateTableInput!
    $condition: ModelTableConditionInput
  ) {
    updateTable(input: $input, condition: $condition) {
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
export const deleteTable = /* GraphQL */ `
  mutation DeleteTable(
    $input: DeleteTableInput!
    $condition: ModelTableConditionInput
  ) {
    deleteTable(input: $input, condition: $condition) {
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
export const createParty = /* GraphQL */ `
  mutation CreateParty(
    $input: CreatePartyInput!
    $condition: ModelPartyConditionInput
  ) {
    createParty(input: $input, condition: $condition) {
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
export const updateParty = /* GraphQL */ `
  mutation UpdateParty(
    $input: UpdatePartyInput!
    $condition: ModelPartyConditionInput
  ) {
    updateParty(input: $input, condition: $condition) {
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
export const deleteParty = /* GraphQL */ `
  mutation DeleteParty(
    $input: DeletePartyInput!
    $condition: ModelPartyConditionInput
  ) {
    deleteParty(input: $input, condition: $condition) {
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
