import SumType from "sums-up";

// The type aliases help with intellisense to differentiate the args
type Id = string;
type Email = string;
type Token = string;

class ActiveUser extends SumType<{
  None: [];
  User: [Id, Token, Email];
}> {}

function None(): ActiveUser {
  return new ActiveUser("None");
}

function User(id: Id, token: Token, email: Email): ActiveUser {
  return new ActiveUser("User", id, token, email);
}

export { ActiveUser, None, User };
