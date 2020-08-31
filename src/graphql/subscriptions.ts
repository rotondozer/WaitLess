/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTable = /* GraphQL */ `
  subscription OnCreateTable(
    $id: ID
    $name: String
    $maxSeats: Int
    $minSeats: Int
    $description: String
  ) {
    onCreateTable(
      id: $id
      name: $name
      maxSeats: $maxSeats
      minSeats: $minSeats
      description: $description
    ) {
      id
      name
      maxSeats
      minSeats
      description
    }
  }
`;
export const onUpdateTable = /* GraphQL */ `
  subscription OnUpdateTable(
    $id: ID
    $name: String
    $maxSeats: Int
    $minSeats: Int
    $description: String
  ) {
    onUpdateTable(
      id: $id
      name: $name
      maxSeats: $maxSeats
      minSeats: $minSeats
      description: $description
    ) {
      id
      name
      maxSeats
      minSeats
      description
    }
  }
`;
export const onDeleteTable = /* GraphQL */ `
  subscription OnDeleteTable(
    $id: ID
    $name: String
    $maxSeats: Int
    $minSeats: Int
    $description: String
  ) {
    onDeleteTable(
      id: $id
      name: $name
      maxSeats: $maxSeats
      minSeats: $minSeats
      description: $description
    ) {
      id
      name
      maxSeats
      minSeats
      description
    }
  }
`;
export const onCreateParty = /* GraphQL */ `
  subscription OnCreateParty(
    $id: ID
    $name: String
    $isWaiting: Boolean
    $waitingSince: AWSTime
    $phone: AWSPhone
  ) {
    onCreateParty(
      id: $id
      name: $name
      isWaiting: $isWaiting
      waitingSince: $waitingSince
      phone: $phone
    ) {
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
export const onUpdateParty = /* GraphQL */ `
  subscription OnUpdateParty(
    $id: ID
    $name: String
    $isWaiting: Boolean
    $waitingSince: AWSTime
    $phone: AWSPhone
  ) {
    onUpdateParty(
      id: $id
      name: $name
      isWaiting: $isWaiting
      waitingSince: $waitingSince
      phone: $phone
    ) {
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
export const onDeleteParty = /* GraphQL */ `
  subscription OnDeleteParty(
    $id: ID
    $name: String
    $isWaiting: Boolean
    $waitingSince: AWSTime
    $phone: AWSPhone
  ) {
    onDeleteParty(
      id: $id
      name: $name
      isWaiting: $isWaiting
      waitingSince: $waitingSince
      phone: $phone
    ) {
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
