import SumType from "sums-up";

class ActiveUser extends SumType<{ None: []; User: [string, string] }> {}

function None(): ActiveUser {
  return new ActiveUser("None");
}

function User(id: string, token: string): ActiveUser {
  return new ActiveUser("User", id, token);
}

export { ActiveUser, None, User };
