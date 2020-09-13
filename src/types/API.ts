/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTableInput = {
  description?: string | null,
  id?: string | null,
  isOccupied: boolean,
  maxSeats: number,
  minSeats: number,
  name: string,
};

export type ModelTableConditionInput = {
  description?: ModelStringInput | null,
  isOccupied?: ModelBooleanInput | null,
  maxSeats?: ModelIntInput | null,
  minSeats?: ModelIntInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelTableConditionInput | null > | null,
  or?: Array< ModelTableConditionInput | null > | null,
  not?: ModelTableConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateTableInput = {
  description?: string | null,
  id: string,
  isOccupied?: boolean | null,
  maxSeats?: number | null,
  minSeats?: number | null,
  name?: string | null,
};

export type DeleteTableInput = {
  id?: string | null,
};

export type CreatePartyInput = {
  estWait?: string | null,
  guestCount: number,
  id?: string | null,
  name: string,
  notes?: string | null,
  phone?: string | null,
  seatedAt?: string | null,
  departedAt?: string | null,
  tableId: string,
  waitingSince?: string | null,
};

export type ModelPartyConditionInput = {
  estWait?: ModelStringInput | null,
  guestCount?: ModelIntInput | null,
  name?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  seatedAt?: ModelStringInput | null,
  departedAt?: ModelStringInput | null,
  tableId?: ModelIDInput | null,
  waitingSince?: ModelStringInput | null,
  and?: Array< ModelPartyConditionInput | null > | null,
  or?: Array< ModelPartyConditionInput | null > | null,
  not?: ModelPartyConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdatePartyInput = {
  estWait?: string | null,
  guestCount?: number | null,
  id: string,
  name?: string | null,
  notes?: string | null,
  phone?: string | null,
  seatedAt?: string | null,
  departedAt?: string | null,
  tableId?: string | null,
  waitingSince?: string | null,
};

export type DeletePartyInput = {
  id?: string | null,
};

export type ModelTableFilterInput = {
  description?: ModelStringInput | null,
  id?: ModelIDInput | null,
  isOccupied?: ModelBooleanInput | null,
  maxSeats?: ModelIntInput | null,
  minSeats?: ModelIntInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelTableFilterInput | null > | null,
  or?: Array< ModelTableFilterInput | null > | null,
  not?: ModelTableFilterInput | null,
};

export type ModelPartyFilterInput = {
  estWait?: ModelStringInput | null,
  guestCount?: ModelIntInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  seatedAt?: ModelStringInput | null,
  departedAt?: ModelStringInput | null,
  tableId?: ModelIDInput | null,
  waitingSince?: ModelStringInput | null,
  and?: Array< ModelPartyFilterInput | null > | null,
  or?: Array< ModelPartyFilterInput | null > | null,
  not?: ModelPartyFilterInput | null,
};

export type CreateTableMutationVariables = {
  input: CreateTableInput,
  condition?: ModelTableConditionInput | null,
};

export type CreateTableMutation = {
  createTable:  {
    __typename: "Table",
    description: string | null,
    id: string,
    isOccupied: boolean,
    maxSeats: number,
    minSeats: number,
    name: string,
    parties:  {
      __typename: "ModelPartyConnection",
      items:  Array< {
        __typename: "Party",
        estWait: string | null,
        guestCount: number,
        id: string,
        name: string,
        notes: string | null,
        phone: string | null,
        seatedAt: string | null,
        departedAt: string | null,
        tableId: string,
        waitingSince: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTableMutationVariables = {
  input: UpdateTableInput,
  condition?: ModelTableConditionInput | null,
};

export type UpdateTableMutation = {
  updateTable:  {
    __typename: "Table",
    description: string | null,
    id: string,
    isOccupied: boolean,
    maxSeats: number,
    minSeats: number,
    name: string,
    parties:  {
      __typename: "ModelPartyConnection",
      items:  Array< {
        __typename: "Party",
        estWait: string | null,
        guestCount: number,
        id: string,
        name: string,
        notes: string | null,
        phone: string | null,
        seatedAt: string | null,
        departedAt: string | null,
        tableId: string,
        waitingSince: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTableMutationVariables = {
  input: DeleteTableInput,
  condition?: ModelTableConditionInput | null,
};

export type DeleteTableMutation = {
  deleteTable:  {
    __typename: "Table",
    description: string | null,
    id: string,
    isOccupied: boolean,
    maxSeats: number,
    minSeats: number,
    name: string,
    parties:  {
      __typename: "ModelPartyConnection",
      items:  Array< {
        __typename: "Party",
        estWait: string | null,
        guestCount: number,
        id: string,
        name: string,
        notes: string | null,
        phone: string | null,
        seatedAt: string | null,
        departedAt: string | null,
        tableId: string,
        waitingSince: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePartyMutationVariables = {
  input: CreatePartyInput,
  condition?: ModelPartyConditionInput | null,
};

export type CreatePartyMutation = {
  createParty:  {
    __typename: "Party",
    estWait: string | null,
    guestCount: number,
    id: string,
    name: string,
    notes: string | null,
    phone: string | null,
    seatedAt: string | null,
    departedAt: string | null,
    tableId: string,
    waitingSince: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePartyMutationVariables = {
  input: UpdatePartyInput,
  condition?: ModelPartyConditionInput | null,
};

export type UpdatePartyMutation = {
  updateParty:  {
    __typename: "Party",
    estWait: string | null,
    guestCount: number,
    id: string,
    name: string,
    notes: string | null,
    phone: string | null,
    seatedAt: string | null,
    departedAt: string | null,
    tableId: string,
    waitingSince: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePartyMutationVariables = {
  input: DeletePartyInput,
  condition?: ModelPartyConditionInput | null,
};

export type DeletePartyMutation = {
  deleteParty:  {
    __typename: "Party",
    estWait: string | null,
    guestCount: number,
    id: string,
    name: string,
    notes: string | null,
    phone: string | null,
    seatedAt: string | null,
    departedAt: string | null,
    tableId: string,
    waitingSince: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTableQueryVariables = {
  id: string,
};

export type GetTableQuery = {
  getTable:  {
    __typename: "Table",
    description: string | null,
    id: string,
    isOccupied: boolean,
    maxSeats: number,
    minSeats: number,
    name: string,
    parties:  {
      __typename: "ModelPartyConnection",
      items:  Array< {
        __typename: "Party",
        estWait: string | null,
        guestCount: number,
        id: string,
        name: string,
        notes: string | null,
        phone: string | null,
        seatedAt: string | null,
        departedAt: string | null,
        tableId: string,
        waitingSince: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTablesQueryVariables = {
  filter?: ModelTableFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTablesQuery = {
  listTables:  {
    __typename: "ModelTableConnection",
    items:  Array< {
      __typename: "Table",
      description: string | null,
      id: string,
      isOccupied: boolean,
      maxSeats: number,
      minSeats: number,
      name: string,
      parties:  {
        __typename: "ModelPartyConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPartyQueryVariables = {
  id: string,
};

export type GetPartyQuery = {
  getParty:  {
    __typename: "Party",
    estWait: string | null,
    guestCount: number,
    id: string,
    name: string,
    notes: string | null,
    phone: string | null,
    seatedAt: string | null,
    departedAt: string | null,
    tableId: string,
    waitingSince: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPartysQueryVariables = {
  filter?: ModelPartyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPartysQuery = {
  listPartys:  {
    __typename: "ModelPartyConnection",
    items:  Array< {
      __typename: "Party",
      estWait: string | null,
      guestCount: number,
      id: string,
      name: string,
      notes: string | null,
      phone: string | null,
      seatedAt: string | null,
      departedAt: string | null,
      tableId: string,
      waitingSince: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateTableSubscription = {
  onCreateTable:  {
    __typename: "Table",
    description: string | null,
    id: string,
    isOccupied: boolean,
    maxSeats: number,
    minSeats: number,
    name: string,
    parties:  {
      __typename: "ModelPartyConnection",
      items:  Array< {
        __typename: "Party",
        estWait: string | null,
        guestCount: number,
        id: string,
        name: string,
        notes: string | null,
        phone: string | null,
        seatedAt: string | null,
        departedAt: string | null,
        tableId: string,
        waitingSince: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTableSubscription = {
  onUpdateTable:  {
    __typename: "Table",
    description: string | null,
    id: string,
    isOccupied: boolean,
    maxSeats: number,
    minSeats: number,
    name: string,
    parties:  {
      __typename: "ModelPartyConnection",
      items:  Array< {
        __typename: "Party",
        estWait: string | null,
        guestCount: number,
        id: string,
        name: string,
        notes: string | null,
        phone: string | null,
        seatedAt: string | null,
        departedAt: string | null,
        tableId: string,
        waitingSince: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTableSubscription = {
  onDeleteTable:  {
    __typename: "Table",
    description: string | null,
    id: string,
    isOccupied: boolean,
    maxSeats: number,
    minSeats: number,
    name: string,
    parties:  {
      __typename: "ModelPartyConnection",
      items:  Array< {
        __typename: "Party",
        estWait: string | null,
        guestCount: number,
        id: string,
        name: string,
        notes: string | null,
        phone: string | null,
        seatedAt: string | null,
        departedAt: string | null,
        tableId: string,
        waitingSince: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePartySubscription = {
  onCreateParty:  {
    __typename: "Party",
    estWait: string | null,
    guestCount: number,
    id: string,
    name: string,
    notes: string | null,
    phone: string | null,
    seatedAt: string | null,
    departedAt: string | null,
    tableId: string,
    waitingSince: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePartySubscription = {
  onUpdateParty:  {
    __typename: "Party",
    estWait: string | null,
    guestCount: number,
    id: string,
    name: string,
    notes: string | null,
    phone: string | null,
    seatedAt: string | null,
    departedAt: string | null,
    tableId: string,
    waitingSince: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePartySubscription = {
  onDeleteParty:  {
    __typename: "Party",
    estWait: string | null,
    guestCount: number,
    id: string,
    name: string,
    notes: string | null,
    phone: string | null,
    seatedAt: string | null,
    departedAt: string | null,
    tableId: string,
    waitingSince: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
