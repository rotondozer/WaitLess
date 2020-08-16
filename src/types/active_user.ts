import SumType from "sums-up";
import { Maybe, Nothing, Just } from "seidr";

// The type aliases help with intellisense to differentiate the args
type Id = string;
type Email = string;
type Token = string;

class ActiveUser extends SumType<{
  None: [];
  User: [Id, Token, Email];
}> {
  /**
   * Map the ActiveUser with the provided function. ActiveUser.None -> Nothing().
   * @param f A mapper function that receives the ActiveUser data as an object.
   */
  public map<T>(
    f: (user: { id: Id; token: Token; email: Email }) => T,
  ): Maybe<T> {
    return this.caseOf({
      None: () => Nothing(),
      User: (id, token, email) => Just(f({ id, token, email })),
    });
  }
}

function None(): ActiveUser {
  return new ActiveUser("None");
}

function User(id: Id, token: Token, email: Email): ActiveUser {
  return new ActiveUser("User", id, token, email);
}

export { ActiveUser, None, User };
