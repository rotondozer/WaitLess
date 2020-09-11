/**
 * Amplify manages the majority of the authentication flow, primarily Sign In/Sign up
 * with built-in UI components.
 * Config for these components is managed in ./with_authentication, along with the HOC
 * that wraps the App component to get the job done.
 */
import { Auth } from "aws-amplify";

/**
 * @returns the current user's username
 * TODO: this could return the whole `CognitoUser` object if I have use for it.
 * But without proper types built in, I'll keep with what I know and need for now.
 */
export function getCurrentUser(
  onSuccess: (username: string) => any,
): Promise<string> {
  return Auth.currentAuthenticatedUser()
    .then(user => {
      console.log("Retrieved current authenticated user", user);
      return user.username;
    })
    .then(onSuccess)
    .catch(err => {
      const error = JSON.stringify(err);
      console.log("Failed getting current user", error);
      return error;
    });
}

export function signOut(): Promise<string> {
  return Auth.signOut()
    .then(user => {
      console.log(`${user.username} signed out.`);
      return user.username;
    })
    .catch(err => {
      const error = JSON.stringify(err);
      console.log("Failed signing out current user", error);
      return error;
    });
}
