/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateParty = /* GraphQL */ `
  subscription OnCreateParty {
    onCreateParty {
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
export const onCreateTable = /* GraphQL */ `
  subscription OnCreateTable(
    $description: String
    $id: ID
    $maxSeats: Int
    $minSeats: Int
    $name: String
  ) {
    onCreateTable(
      description: $description
      id: $id
      maxSeats: $maxSeats
      minSeats: $minSeats
      name: $name
    ) {
      description
      id
      maxSeats
      minSeats
      name
      author
    }
  }
`;
export const onDeleteParty = /* GraphQL */ `
  subscription OnDeleteParty {
    onDeleteParty {
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
export const onDeleteTable = /* GraphQL */ `
  subscription OnDeleteTable(
    $description: String
    $id: ID
    $maxSeats: Int
    $minSeats: Int
    $name: String
  ) {
    onDeleteTable(
      description: $description
      id: $id
      maxSeats: $maxSeats
      minSeats: $minSeats
      name: $name
    ) {
      description
      id
      maxSeats
      minSeats
      name
      author
    }
  }
`;
export const onUpdateParty = /* GraphQL */ `
  subscription OnUpdateParty {
    onUpdateParty {
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
export const onUpdateTable = /* GraphQL */ `
  subscription OnUpdateTable(
    $description: String
    $id: ID
    $maxSeats: Int
    $minSeats: Int
    $name: String
  ) {
    onUpdateTable(
      description: $description
      id: $id
      maxSeats: $maxSeats
      minSeats: $minSeats
      name: $name
    ) {
      description
      id
      maxSeats
      minSeats
      name
      author
    }
  }
`;
