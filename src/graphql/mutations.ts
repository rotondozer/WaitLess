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
export const createParty = /* GraphQL */ `
  mutation CreateParty(
    $input: CreatePartyInput!
    $condition: ModelPartyConditionInput
  ) {
    createParty(input: $input, condition: $condition) {
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
export const updateParty = /* GraphQL */ `
  mutation UpdateParty(
    $input: UpdatePartyInput!
    $condition: ModelPartyConditionInput
  ) {
    updateParty(input: $input, condition: $condition) {
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
export const deleteParty = /* GraphQL */ `
  mutation DeleteParty(
    $input: DeletePartyInput!
    $condition: ModelPartyConditionInput
  ) {
    deleteParty(input: $input, condition: $condition) {
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
