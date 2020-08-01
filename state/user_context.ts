import React from "react";
import * as ActiveUser from "../types/active_user";

export default React.createContext<ActiveUser.ActiveUser>(ActiveUser.None());
