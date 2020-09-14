/**
 * A types API for React Navigation
 * ParamList types are are defined and exported here because the same type is needed by the parent component
 * (containing the Stack.Navigator) and the screens they render. Defining these types in either one of those places
 * is begging for a circular dependency.
 *
 * All the child screens that are pushed are on the `RootStack` so the navigation bar is hidden when
 * navigating to any of them. Although defining the nested stacks based on association makes more
 * sense for logical grouping, these is the 'best practice' in React Navigation to acheive this
 * desired behavior.
 */
import { Party, Table } from "./data";

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined; // ActiveUser not on the param list because it's supplied with a React.Context HOC{ userId: string; token: string; email: string };
  AddPartyForm: { onAddParty: (p: Party) => Party }; // ActiveUser not on the param list because it's supplied with a React.Context HOC
  EditPartyForm: { party: Party };
  AvailableTables: { party: Party };
  TableDetails: { table: Table };
};
export type HomeTabsParamList = {
  Waitlist: undefined;
  Tables: undefined;
};
