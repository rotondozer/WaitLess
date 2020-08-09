import React from "react";
import * as ActiveUser from "../types/active_user";

export type WithUserContext<T = {}> = T & { user: ActiveUser.ActiveUser };

const UserContext = React.createContext<ActiveUser.ActiveUser>(
  ActiveUser.None(),
);

function withUserContext<T>(
  Component: React.FunctionComponent<T>,
): React.FunctionComponent<T> {
  return (props: T) => (
    <UserContext.Consumer>
      {user => <Component {...props} user={user} />}
    </UserContext.Consumer>
  );
}

export { UserContext, withUserContext };
