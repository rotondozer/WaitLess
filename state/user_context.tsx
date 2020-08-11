import React from "react";
import * as ActiveUser from "../types/active_user";

export type WithUserContext<T = {}> = T & Context;

type Context = {
  user: ActiveUser.ActiveUser;
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
