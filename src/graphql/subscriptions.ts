/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateParty = /* GraphQL */ `
  subscription OnCreateParty(
    $id: ID
    $name: String
    $guestCount: Int
    $estWait: AWSTime
    $waitingSince: AWSDateTime
  ) {
    onCreateParty(
      id: $id
      name: $name
      guestCount: $guestCount
      estWait: $estWait
      waitingSince: $waitingSince
    ) {
      id
      name
      guestCount
      estWait
      waitingSince
      phone
    }
  }
`;
export const onUpdateParty = /* GraphQL */ `
  subscription OnUpdateParty(
    $id: ID
    $name: String
    $guestCount: Int
    $estWait: AWSTime
    $waitingSince: AWSDateTime
  ) {
    onUpdateParty(
      id: $id
      name: $name
      guestCount: $guestCount
      estWait: $estWait
      waitingSince: $waitingSince
    ) {
      id
      name
      guestCount
      estWait
      waitingSince
      phone
    }
  }
`;
export const onDeleteParty = /* GraphQL */ `
  subscription OnDeleteParty(
    $id: ID
    $name: String
    $guestCount: Int
    $estWait: AWSTime
    $waitingSince: AWSDateTime
  ) {
    onDeleteParty(
      id: $id
      name: $name
      guestCount: $guestCount
      estWait: $estWait
      waitingSince: $waitingSince
    ) {
      id
      name
      guestCount
      estWait
      waitingSince
      phone
    }
  }
`;
