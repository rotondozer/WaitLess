import React from "react";
import { ActiveUser } from "../types";

export type WithUserContext<T = {}> = T & Context;

type Context = {
  user: ActiveUser.ActiveUser;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateUser: (user: ActiveUser.ActiveUser) => any;
}; // TODO: get rid of any

const UserContext = React.createContext<Context>({
  user: ActiveUser.None(),
  updateUser: () => {},
});

function withUserContext<T>(
  Component: React.FunctionComponent<T>,
): React.FunctionComponent<T> {
  return (props: T) => (
    <UserContext.Consumer>
      {({ user, updateUser }) => (
        <Component {...props} user={user} updateUser={updateUser} />
      )}
    </UserContext.Consumer>
  );
}

export { UserContext, withUserContext };
