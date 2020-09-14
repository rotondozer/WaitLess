/**
 * A types API for React Navigation
 * ParamList types are are defined and exported here because the same type is needed by the parent component
 * (containing the Stack.Navigator) and the screens they render. Defining these types in either one of those places
 * is begging for a circular dependency.
 */
import { Party, Table } from "./data";

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined; // ActiveUser not on the param list because it's supplied with a React.Context HOC{ userId: string; token: string; email: string };
};
export type WaitlistStackParamList = {
  Waitlist: undefined;
  AddPartyForm: { onAddParty: (p: Party) => Party }; // ActiveUser not on the param list because it's supplied with a React.Context HOC
  EditPartyForm: { party: Party; onRemoveParty: (p: Party) => Party };
  AvailableTables: { party: Party; onSeatParty: (p: Party) => Party };
};
export type TablesStackParamList = {
  Tables: undefined;
  TableDetails: { table: Table };
};
