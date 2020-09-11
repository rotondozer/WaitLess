import React from "react";
import {
  withAuthenticator as withAmplifyAuthenticator,
  AmplifyTheme,
  WithAuthenticatorProps,
  WACompProps,
} from "aws-amplify-react-native";
import { I18n } from "aws-amplify";
import { Colors } from "styles";

/**
 * * *  TEXT OVERRIDES * * *
 * https://github.com/aws-amplify/amplify-js/blob/main/packages/amplify-ui-components/src/common/Translations.ts
 * Why does this only work in debug?
 */
I18n.putVocabulariesForLanguage("en-US", {
  ["Sign in to your account"]: "Sign in to WaitLess",
});

/**
 * * * THEME OVERRIDES *  * *
 * https://github.com/aws-amplify/amplify-js/blob/main/packages/aws-amplify-react-native/src/AmplifyTheme.ts
 */
const container = Object.assign({}, AmplifyTheme.container, {
  backgroundColor: Colors.whitish,
});
const button = Object.assign({}, AmplifyTheme.button, {
  backgroundColor: Colors.blueGray,
  borderRadius: 5,
});
const buttonDisabled = Object.assign({}, AmplifyTheme.button, {
  backgroundColor: Colors.blueGray.concat("80"),
  borderRadius: 5,
});
const sectionFooterLink = Object.assign({}, AmplifyTheme.sectionFooterLink, {
  color: Colors.blue,
});

const AuthenticatorTheme = Object.assign({}, AmplifyTheme, {
  container,
  button,
  buttonDisabled,
  sectionFooterLink,
});

// -- SIGN UP CONFIG

const signUpConfig = {
  header: "Create a new WaitLess account",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Username",
      key: "username",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 2,
      type: "password",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 3,
      type: "string",
    },
  ],
};

/**
 * A wrapper for using AWS Amplify's `withAuthenticator` HOC.
 * Styling and config has been customized.
 * @param AppComponent The entry, App.tsx
 */
export default function withAuthentication(
  AppComponent: React.ComponentType<WACompProps>,
): React.ComponentClass<WithAuthenticatorProps> {
  return withAmplifyAuthenticator(
    AppComponent,
    undefined,
    undefined,
    undefined,
    AuthenticatorTheme,
    signUpConfig,
  );
}
