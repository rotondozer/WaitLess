/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePartyInput = {
  name: string,
  guestCount: number,
  estWait?: string | null,
  waitingSince: string,
  phone?: string | null,
};

export type UpdatePartyInput = {
  id: string,
  name?: string | null,
  guestCount?: number | null,
  estWait?: string | null,
  waitingSince?: string | null,
  phone?: string | null,
};

export type DeletePartyInput = {
  id: string,
};

export type TablePartyFilterInput = {
  id?: TableIDFilterInput | null,
  name?: TableStringFilterInput | null,
  guestCount?: TableIntFilterInput | null,
  estWait?: TableStringFilterInput | null,
  waitingSince?: TableStringFilterInput | null,
  phone?: TableStringFilterInput | null,
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

export type CreatePartyMutationVariables = {
  input: CreatePartyInput,
};

export type CreatePartyMutation = {
  createParty:  {
    __typename: "Party",
    id: string,
    name: string,
    guestCount: number,
    estWait: string | null,
    waitingSince: string,
    phone: string | null,
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
    guestCount: number,
    estWait: string | null,
    waitingSince: string,
    phone: string | null,
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
    guestCount: number,
    estWait: string | null,
    waitingSince: string,
    phone: string | null,
  } | null,
};

export type GetPartyQueryVariables = {
  id: string,
};

export type GetPartyQuery = {
  getParty:  {
    __typename: "Party",
    id: string,
    name: string,
    guestCount: number,
    estWait: string | null,
    waitingSince: string,
    phone: string | null,
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
      guestCount: number,
      estWait: string | null,
      waitingSince: string,
      phone: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreatePartySubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  guestCount?: number | null,
  estWait?: string | null,
  waitingSince?: string | null,
};

export type OnCreatePartySubscription = {
  onCreateParty:  {
    __typename: "Party",
    id: string,
    name: string,
    guestCount: number,
    estWait: string | null,
    waitingSince: string,
    phone: string | null,
  } | null,
};

export type OnUpdatePartySubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  guestCount?: number | null,
  estWait?: string | null,
  waitingSince?: string | null,
};

export type OnUpdatePartySubscription = {
  onUpdateParty:  {
    __typename: "Party",
    id: string,
    name: string,
    guestCount: number,
    estWait: string | null,
    waitingSince: string,
    phone: string | null,
  } | null,
};

export type OnDeletePartySubscriptionVariables = {
  id?: string | null,
  name?: string | null,
  guestCount?: number | null,
  estWait?: string | null,
  waitingSince?: string | null,
};

export type OnDeletePartySubscription = {
  onDeleteParty:  {
    __typename: "Party",
    id: string,
    name: string,
    guestCount: number,
    estWait: string | null,
    waitingSince: string,
    phone: string | null,
  } | null,
};
