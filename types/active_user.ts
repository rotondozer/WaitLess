import SumType from "sums-up";

class ActiveUser extends SumType<{
  None: [];
  User: [string, string, string];
}> {}

function None(): ActiveUser {
  return new ActiveUser("None");
}

function User(id: string, token: string, email: string): ActiveUser {
  return new ActiveUser("User", id, token, email);
}

export { ActiveUser, None, User };
