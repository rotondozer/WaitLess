/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getParty = /* GraphQL */ `
  query GetParty($id: ID!) {
    getParty(id: $id) {
      id
      name
      guestCount
      estWait
      waitingSince
      phone
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
        estWait
        waitingSince
        phone
      }
      nextToken
    }
  }
`;
