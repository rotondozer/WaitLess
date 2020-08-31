/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTableInput = {
  id: string,
  name: string,
  maxSeats: number,
  minSeats: number,
  description?: string | null,
};

export type UpdateTableInput = {
  id: string,
  name?: string | null,
  maxSeats: number,
  minSeats?: number | null,
  description?: string | null,
};

export type DeleteTableInput = {
  id: string,
  maxSeats: number,
};

export type CreatePartyInput = {
  id: string,
  name: string,
  isWaiting: boolean,
  waitingSince: string,
  phone?: string | null,
  email?: string | null,
  notes?: string | null,
};

export type UpdatePartyInput = {
  id: string,
  name?: string | null,
  isWaiting?: boolean | null,
  waitingSince: string,
  phone?: string | null,
  email?: string | null,
  notes?: string | null,
};

export type DeletePartyInput = {
  id: string,
  waitingSince: string,
};

export type TableTableFilterInput = {
  id?: TableIDFilterInput | null,
  name?: TableStringFilterInput | null,
  maxSeats?: TableIntFilterInput | null,
  minSeats?: TableIntFilterInput | null,
  description?: TableStringFilterInput | null,
};

export type TableIDFilterInput = {
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
};

export type TableStringFilterInput = {
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
};

export type TableIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export type TablePartyFilterInput = {
  id?: TableIDFilterInput | null,
  name?: TableStringFilterInput | null,
  isWaiting?: TableBooleanFilterInput | null,
  waitingSince?: TableStringFilterInput | null,
  phone?: TableStringFilterInput | null,
  email?: TableStringFilterInput | null,
  notes?: TableStringFilterInput | null,
};

export type TableBooleanFilterInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type CreateTableMutationVariables = {
  input: CreateTableInput,
};

export type CreateTableMutation = {
  createTable:  {
    __typename: "Table",
    id: string,
    name: string,
    maxSeats: number,
    minSeats: number,
    description: string | null,
  } | null,
};

export type UpdateTableMutationVariables = {
  input: UpdateTableInput,
};

export type UpdateTableMutation = {
  updateTable:  {
    __typename: "Table",
    id: string,
    name: string,
    maxSeats: number,
    minSeats: number,
    description: string | null,
  } | null,
};

export type DeleteTableMutationVariables = {
  input: DeleteTableInput,
};

export type DeleteTableMutation = {
  deleteTable:  {
    __typename: "Table",
    id: string,
    name: string,
    maxSeats: number,
    minSeats: number,
    description: string | null,
  } | null,
};

export type CreatePartyMutationVariables = {
  input: CreatePartyInput,
};

export type CreatePartyMutation = {
  createParty:  {
    __typename: "Party",
    id: string,
    name: string,
    isWaiting: boolean,
    waitingSince: string,
    phone: string | null,
    email: string | null,
    notes: string | null,
    table:  {
      __typename: "Table",
      id: string,
      name: string,
      maxSeats: number,
      minSeats: number,
      description: string | null,
    } | null,
  } | null,
};

export type UpdatePartyMutationVariables = {
  input: UpdatePartyInput,
};

export type UpdatePartyMutation = {
  updateParty:  {
    __typename: "Party",
    id: string,
    name: string,
    isWaiting: boolean,
    waitingSince: string,
    phone: string | null,
    email: string | null,
    notes: string | null,
    table:  {
      __typename: "Table",
      id: string,
      name: string,
      maxSeats: number,
      minSeats: number,
      description: string | null,
    } | null,
  } | null,
};

export type DeletePartyMutationVariables = {
  input: DeletePartyInput,
};

export type DeletePartyMutation = {
  deleteParty:  {
    __typename: "Party",
    id: string,
    name: string,
    isWaiting: boolean,
    waitingSince: string,
    phone: string | null,
    email: string | null,
    notes: string | null,
    table:  {
      __typename: "Table",
      id: string,
      name: string,
      maxSeats: number,
      minSeats: number,
      description: string | null,
    } | null,
  } | null,
};

export type GetTableQueryVariables = {
  id: string,
  maxSeats: number,
};

export type GetTableQuery = {
  getTable:  {
    __typename: "Table",
    id: string,
    name: string,
    maxSeats: number,
    minSeats: number,
    description: string | null,
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
      id: string,
      name: string,
      maxSeats: number,
      minSeats: number,
      description: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetPartyQueryVariables = {
  id: string,
  waitingSince: string,
};

export type GetPartyQuery = {
  getParty:  {
    __typename: "Party",
    id: string,
    name: string,
    isWaiting: boolean,
    waitingSince: string,
    phone: string | null,
    email: string | null,
    notes: string | null,
    table:  {
      __typename: "Table",
      id: string,
      name: string,
      maxSeats: number,
      minSeats: number,
      description: string | null,
    } | null,
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
      id: string,
      name: string,
      isWaiting: boolean,
      waitingSince: string,
      phone: string | null,
      email: string | null,
      notes: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateTableSubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  maxSeats?: number | null,
  minSeats?: number | null,
  description?: string | null,
};

export type OnCreateTableSubscription = {
  onCreateTable:  {
    __typename: "Table",
    id: string,
    name: string,
    maxSeats: number,
    minSeats: number,
    description: string | null,
  } | null,
};

export type OnUpdateTableSubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  maxSeats?: number | null,
  minSeats?: number | null,
  description?: string | null,
};

export type OnUpdateTableSubscription = {
  onUpdateTable:  {
    __typename: "Table",
    id: string,
    name: string,
    maxSeats: number,
    minSeats: number,
    description: string | null,
  } | null,
};

export type OnDeleteTableSubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  maxSeats?: number | null,
  minSeats?: number | null,
  description?: string | null,
};

export type OnDeleteTableSubscription = {
  onDeleteTable:  {
    __typename: "Table",
    id: string,
    name: string,
    maxSeats: number,
    minSeats: number,
    description: string | null,
  } | null,
};

export type OnCreatePartySubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  isWaiting?: boolean | null,
  waitingSince?: string | null,
  phone?: string | null,
};

export type OnCreatePartySubscription = {
  onCreateParty:  {
    __typename: "Party",
    id: string,
    name: string,
    isWaiting: boolean,
    waitingSince: string,
    phone: string | null,
    email: string | null,
    notes: string | null,
    table:  {
      __typename: "Table",
      id: string,
      name: string,
      maxSeats: number,
      minSeats: number,
      description: string | null,
    } | null,
  } | null,
};

export type OnUpdatePartySubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  isWaiting?: boolean | null,
  waitingSince?: string | null,
  phone?: string | null,
};

export type OnUpdatePartySubscription = {
  onUpdateParty:  {
    __typename: "Party",
    id: string,
    name: string,
    isWaiting: boolean,
    waitingSince: string,
    phone: string | null,
    email: string | null,
    notes: string | null,
    table:  {
      __typename: "Table",
      id: string,
      name: string,
      maxSeats: number,
      minSeats: number,
      description: string | null,
    } | null,
  } | null,
};

export type OnDeletePartySubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  isWaiting?: boolean | null,
  waitingSince?: string | null,
  phone?: string | null,
};

export type OnDeletePartySubscription = {
  onDeleteParty:  {
    __typename: "Party",
    id: string,
    name: string,
    isWaiting: boolean,
    waitingSince: string,
    phone: string | null,
    email: string | null,
    notes: string | null,
    table:  {
      __typename: "Table",
      id: string,
      name: string,
      maxSeats: number,
      minSeats: number,
      description: string | null,
    } | null,
  } | null,
};
