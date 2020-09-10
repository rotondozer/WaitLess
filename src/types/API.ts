/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePartyInput = {
  email?: string | null,
  estWait?: string | null,
  guestCount: number,
  id: string,
  isWaiting: boolean,
  name: string,
  notes?: string | null,
  phone?: string | null,
  seatedAt?: string | null,
  waitingSince: string,
};

export type CreateTableInput = {
  description?: string | null,
  id: string,
  maxSeats: number,
  minSeats: number,
  name: string,
};

export type DeletePartyInput = {
  id: string,
  waitingSince: string,
};

export type DeleteTableInput = {
  id: string,
  maxSeats: number,
};

export type UpdatePartyInput = {
  email?: string | null,
  estWait?: string | null,
  guestCount: number,
  id: string,
  isWaiting?: boolean | null,
  name?: string | null,
  notes?: string | null,
  phone?: string | null,
  seatedAt?: string | null,
  waitingSince: string,
};

export type UpdateTableInput = {
  description?: string | null,
  id: string,
  maxSeats: number,
  minSeats?: number | null,
  name?: string | null,
};

export type TablePartyFilterInput = {
  email?: TableStringFilterInput | null,
  estWait?: TableStringFilterInput | null,
  guestCount?: TableIntFilterInput | null,
  id?: TableIDFilterInput | null,
  isWaiting?: TableBooleanFilterInput | null,
  name?: TableStringFilterInput | null,
  notes?: TableStringFilterInput | null,
  phone?: TableStringFilterInput | null,
  seatedAt?: TableStringFilterInput | null,
  waitingSince?: TableStringFilterInput | null,
};

export type TableStringFilterInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
};

export type TableIntFilterInput = {
  between?: Array< number | null > | null,
  contains?: number | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notContains?: number | null,
};

export type TableIDFilterInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
};

export type TableBooleanFilterInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type TableTableFilterInput = {
  description?: TableStringFilterInput | null,
  id?: TableIDFilterInput | null,
  maxSeats?: TableIntFilterInput | null,
  minSeats?: TableIntFilterInput | null,
  name?: TableStringFilterInput | null,
};

export type CreatePartyMutationVariables = {
  input: CreatePartyInput,
};

export type CreatePartyMutation = {
  createParty:  {
    __typename: "Party",
    email: string | null,
    estWait: string | null,
    guestCount: number,
    id: string,
    isWaiting: boolean,
    name: string,
    notes: string | null,
    phone: string | null,
    seatedAt: string | null,
    table:  {
      __typename: "Table",
      description: string | null,
      id: string,
      maxSeats: number,
      minSeats: number,
      name: string,
    } | null,
    waitingSince: string,
  } | null,
};

export type CreateTableMutationVariables = {
  input: CreateTableInput,
};

export type CreateTableMutation = {
  createTable:  {
    __typename: "Table",
    description: string | null,
    id: string,
    maxSeats: number,
    minSeats: number,
    name: string,
  } | null,
};

export type DeletePartyMutationVariables = {
  input: DeletePartyInput,
};

export type DeletePartyMutation = {
  deleteParty:  {
    __typename: "Party",
    email: string | null,
    estWait: string | null,
    guestCount: number,
    id: string,
    isWaiting: boolean,
    name: string,
    notes: string | null,
    phone: string | null,
    seatedAt: string | null,
    table:  {
      __typename: "Table",
      description: string | null,
      id: string,
      maxSeats: number,
      minSeats: number,
      name: string,
    } | null,
    waitingSince: string,
  } | null,
};

export type DeleteTableMutationVariables = {
  input: DeleteTableInput,
};

export type DeleteTableMutation = {
  deleteTable:  {
    __typename: "Table",
    description: string | null,
    id: string,
    maxSeats: number,
    minSeats: number,
    name: string,
  } | null,
};

export type UpdatePartyMutationVariables = {
  input: UpdatePartyInput,
};

export type UpdatePartyMutation = {
  updateParty:  {
    __typename: "Party",
    email: string | null,
    estWait: string | null,
    guestCount: number,
    id: string,
    isWaiting: boolean,
    name: string,
    notes: string | null,
    phone: string | null,
    seatedAt: string | null,
    table:  {
      __typename: "Table",
      description: string | null,
      id: string,
      maxSeats: number,
      minSeats: number,
      name: string,
    } | null,
    waitingSince: string,
  } | null,
};

export type UpdateTableMutationVariables = {
  input: UpdateTableInput,
};

export type UpdateTableMutation = {
  updateTable:  {
    __typename: "Table",
    description: string | null,
    id: string,
    maxSeats: number,
    minSeats: number,
    name: string,
  } | null,
};

export type GetPartyQueryVariables = {
  id: string,
  waitingSince: string,
};

export type GetPartyQuery = {
  getParty:  {
    __typename: "Party",
    email: string | null,
    estWait: string | null,
    guestCount: number,
    id: string,
    isWaiting: boolean,
    name: string,
    notes: string | null,
    phone: string | null,
    seatedAt: string | null,
    table:  {
      __typename: "Table",
      description: string | null,
      id: string,
      maxSeats: number,
      minSeats: number,
      name: string,
    } | null,
    waitingSince: string,
  } | null,
};

export type GetTableQueryVariables = {
  id: string,
  maxSeats: number,
};

export type GetTableQuery = {
  getTable:  {
    __typename: "Table",
    description: string | null,
    id: string,
    maxSeats: number,
    minSeats: number,
    name: string,
  } | null,
};

export type ListPartiesQueryVariables = {
  filter?: TablePartyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPartiesQuery = {
  listParties:  {
    __typename: "PartyConnection",
    items:  Array< {
      __typename: "Party",
      email: string | null,
      estWait: string | null,
      guestCount: number,
      id: string,
      isWaiting: boolean,
      name: string,
      notes: string | null,
      phone: string | null,
      seatedAt: string | null,
      waitingSince: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListTablesQueryVariables = {
  filter?: TableTableFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTablesQuery = {
  listTables:  {
    __typename: "TableConnection",
    items:  Array< {
      __typename: "Table",
      description: string | null,
      id: string,
      maxSeats: number,
      minSeats: number,
      name: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreatePartySubscription = {
  onCreateParty:  {
    __typename: "Party",
    email: string | null,
    estWait: string | null,
    guestCount: number,
    id: string,
    isWaiting: boolean,
    name: string,
    notes: string | null,
    phone: string | null,
    seatedAt: string | null,
    table:  {
      __typename: "Table",
      description: string | null,
      id: string,
      maxSeats: number,
      minSeats: number,
      name: string,
    } | null,
    waitingSince: string,
  } | null,
};

export type OnCreateTableSubscriptionVariables = {
  description?: string | null,
  id?: string | null,
  maxSeats?: number | null,
  minSeats?: number | null,
  name?: string | null,
};

export type OnCreateTableSubscription = {
  onCreateTable:  {
    __typename: "Table",
    description: string | null,
    id: string,
    maxSeats: number,
    minSeats: number,
    name: string,
  } | null,
};

export type OnDeletePartySubscription = {
  onDeleteParty:  {
    __typename: "Party",
    email: string | null,
    estWait: string | null,
    guestCount: number,
    id: string,
    isWaiting: boolean,
    name: string,
    notes: string | null,
    phone: string | null,
    seatedAt: string | null,
    table:  {
      __typename: "Table",
      description: string | null,
      id: string,
      maxSeats: number,
      minSeats: number,
      name: string,
    } | null,
    waitingSince: string,
  } | null,
};

export type OnDeleteTableSubscriptionVariables = {
  description?: string | null,
  id?: string | null,
  maxSeats?: number | null,
  minSeats?: number | null,
  name?: string | null,
};

export type OnDeleteTableSubscription = {
  onDeleteTable:  {
    __typename: "Table",
    description: string | null,
    id: string,
    maxSeats: number,
    minSeats: number,
    name: string,
  } | null,
};

export type OnUpdatePartySubscription = {
  onUpdateParty:  {
    __typename: "Party",
    email: string | null,
    estWait: string | null,
    guestCount: number,
    id: string,
    isWaiting: boolean,
    name: string,
    notes: string | null,
    phone: string | null,
    seatedAt: string | null,
    table:  {
      __typename: "Table",
      description: string | null,
      id: string,
      maxSeats: number,
      minSeats: number,
      name: string,
    } | null,
    waitingSince: string,
  } | null,
};

export type OnUpdateTableSubscriptionVariables = {
  description?: string | null,
  id?: string | null,
  maxSeats?: number | null,
  minSeats?: number | null,
  name?: string | null,
};

export type OnUpdateTableSubscription = {
  onUpdateTable:  {
    __typename: "Table",
    description: string | null,
    id: string,
    maxSeats: number,
    minSeats: number,
    name: string,
  } | null,
};
