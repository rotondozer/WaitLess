/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTable = /* GraphQL */ `
  subscription OnCreateTable {
    onCreateTable {
      description
      id
      isOccupied
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
export const onUpdateTable = /* GraphQL */ `
  subscription OnUpdateTable {
    onUpdateTable {
      description
      id
      isOccupied
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
export const onDeleteTable = /* GraphQL */ `
  subscription OnDeleteTable {
    onDeleteTable {
      description
      id
      isOccupied
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
export const onCreateParty = /* GraphQL */ `
  subscription OnCreateParty {
    onCreateParty {
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
export const onUpdateParty = /* GraphQL */ `
  subscription OnUpdateParty {
    onUpdateParty {
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
export const onDeleteParty = /* GraphQL */ `
  subscription OnDeleteParty {
    onDeleteParty {
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
