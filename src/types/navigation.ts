import { Party } from "./data";
/**
 * A types API for React Navigation
 * ParamList types are are defined and exported here because the same type is needed by the parent component
 * (containing the Stack.Navigator) and the screens they render. Defining these types in either one of those places
 * is begging for a circular dependency.
 */

export type RootStackParamList = {
  Home: { email: string };
  Settings: undefined; // ActiveUser not on the param list because it's supplied with a React.Context HOC{ userId: string; token: string; email: string };
};
export type WaitlistStackParamList = {
  Waitlist: undefined;
  AddPartyForm: undefined; // ActiveUser not on the param list because it's supplied with a React.Context HOC
  EditPartyForm: { party: Party; onRemoveParty: (p: Party) => Party };
};
