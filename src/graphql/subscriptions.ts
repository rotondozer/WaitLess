/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTable = /* GraphQL */ `
  subscription OnCreateTable($owner: String!) {
    onCreateTable(owner: $owner) {
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
export const onUpdateTable = /* GraphQL */ `
  subscription OnUpdateTable($owner: String!) {
    onUpdateTable(owner: $owner) {
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
export const onDeleteTable = /* GraphQL */ `
  subscription OnDeleteTable($owner: String!) {
    onDeleteTable(owner: $owner) {
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
export const onCreateParty = /* GraphQL */ `
  subscription OnCreateParty($owner: String!) {
    onCreateParty(owner: $owner) {
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
export const onUpdateParty = /* GraphQL */ `
  subscription OnUpdateParty($owner: String!) {
    onUpdateParty(owner: $owner) {
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
export const onDeleteParty = /* GraphQL */ `
  subscription OnDeleteParty($owner: String!) {
    onDeleteParty(owner: $owner) {
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
