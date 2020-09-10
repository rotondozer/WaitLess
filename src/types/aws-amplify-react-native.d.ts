/**
 * The 'aws-amplify-react-native' package does not have its own types, or @types/ installation
 * These were found and copied from here: github.com/dantasfiles/AmplifyReactNativeTypes/
 */
declare module "aws-amplify-react-native" {
  const Amplify: any;
  export default Amplify;

  // *** UI ***
  interface Theme {
    container: {};
    section: {};
    sectionHeader: {};
    sectionHeaderText: {};
    sectionFooter: {};
    sectionFooterLink: {};
    navBar: {};
    navButton: {};
    cell: {};
    errorRow: {};
    errorRowText: {};
    photo: {};
    album: {};
    button: {};
    buttonDisabled: {};
    buttonText: {};
    formField: {};
    input: {};
    inputLabel: {};
    phoneContainer: {};
    phoneInput: {};
    picker: {};
    pickerItem: {};
  }

  export const AmplifyTheme: Theme;

  export const AmplifyMessageMapEntries: (string | RegExp)[][];

  interface UIProps {
    theme?: Theme;
  }

  interface FormFieldProps extends UIProps {
    label?: string;
    required?: boolean;
    [propName: string]: any;
  }
  export const FormField: React.FC<FormFieldProps>;

  interface PhoneFieldProps extends UIProps {
    label?: string;
    required?: boolean;
    defaultDialCode?: string;
    onChangeText: (phone: string) => void;
    [propName: string]: any;
  }
  export const PhoneField: React.ComponentClass<PhoneFieldProps>;

  // DON'T THINK THIS IS ACTUALLY USED
  export const SectionFooter: React.FC<UIProps>;

  interface LinkCellProps extends UIProps {
    onPress: () => void;
  }
  export const LinkCell: React.FC<LinkCellProps>;

  export const Header: React.FC<UIProps>;

  export const ErrorRow: React.FC<UIProps>;

  interface AmplifyButtonProps extends UIProps {
    disabled?: boolean;
    style?: any;
    text?: string;
    [propName: string]: any;
  }
  export const AmplifyButton: React.FC<iAmplifyButtonProps>;

  // *** AUTH ***
  interface SignUpFields {
    label: string;
    key: string;
    required: boolean;
    displayOrder: number;
    type: string;
    custom?: boolean;
  }
  interface SignUpConfig {
    header?: string;
    hiddenDefaults?: string[];
    hideAllDefaults?: boolean;
    defaultCountryCode?: string;
    signUpFields?: SignUpFields[];
  }
  interface AuthConfig {
    includeGreetings?: boolean;
    usernameAttributes?: string;
    authenticatorComponents?: typeof AuthPiece[];
    signUpConfig?: SignUpConfig;
  }
  interface WACompProps {
    authState: string;
    authData: any;
    onStateChange: (state: string, data: any) => void;
  }
  interface WithAuthenticatorProps {
    authState?: string;
    onStateChange?: (state: string, data: any) => void;
    [propName: string]: any;
  }
  export function withAuthenticator(
    Comp: React.ComponentType<WACompProps>,
    includeGreetings?: boolean | AuthConfig,
    authenticatorComponents?: typeof AuthPiece[],
    federated?: any,
    theme?: Theme,
    signUpConfig?: SignUpConfig,
  ): React.ComponentClass<WithAuthenticatorProps>;

  interface AuthenticatorProps {
    authState?: string;
    authData?: any;
    onStateChange?: (state: string, data: any) => void;
    theme?: Theme;
    errorMessage?: (message: string) => string;
    hideDefault?: boolean;
    signUpConfig?: SignUpConfig;
    usernameAttributes?: string;
  }
  export const Authenticator: React.ComponentClass<AuthenticatorProps>;

  interface AuthPieceProps {
    usernameAttributes?: string;
    onStateChange?: (state: string, data: any) => void;
    errorMessage?: (message: string) => string;
    messageMap?: (message: string) => string;
    authState?: string;
    track?: () => void;
    theme?: Theme;
    authData?: any;
  }
  export const AuthPiece: React.ComponentClass<AuthPieceProps>;

  export const Loading: typeof AuthPiece;

  export const SignIn: typeof AuthPiece;

  export const ConfirmSignIn: typeof AuthPiece;

  interface SignUpProps extends AuthPieceProps {
    signUpConfig?: SignUpConfig;
  }
  export const SignUp: React.ComponentClass<SignUpProps>;

  export const ConfirmSignUp: typeof AuthPiece;

  export const ForgotPassword: typeof AuthPiece;

  export const RequireNewPassword: typeof AuthPiece;

  export const VerifyContact: typeof AuthPiece;

  interface GreetingsProps extends AuthPieceProps {
    signedInMessage?: string;
    signedOutMessage?: string;
  }
  export const Greetings: React.ComponentClass<GreetingsProps>;

  interface WithOAuthProps {
    oauth_config?: any;
    [propName: string]: any;
  }
  interface WOACompProps {
    loading: boolean;
    oAuthUser: any;
    oAuthError: any;
    hostedUISignIn: () => void;
    facebookSignIn: () => void;
    amazonSignIn: () => void;
    googleSignIn: () => void;
    customProviderSignIn: (provider: string) => void;
    signOut: () => void;
  }
  export function withOAuth(
    Comp: React.ComponentType<iWOACompProps>,
  ): React.ComponentClass<iWithOAuthProps>;

  // *** API ***
  interface GraphQLOperation {
    query: any;
    variables: {};
  }
  interface ConnectProps {
    query?: GraphQLOperation;
    mutation?: GraphQLOperation;
    subscription?: GraphQLOperation;
    onSubscriptionMsg?: (prevData: any, data: any) => any;
  }
  export const Connect: React.ComponentClass<ConnectProps>;

  // *** STORAGE ***
  interface S3ImageProps extends UIProps {
    imgKey?: string;
    level?: string;
    body?: any;
    contentType?: string;
    style?: string;
    resizeMode?: string;
  }
  export const S3Image: React.ComponentClass<S3ImageProps>;

  interface S3AlbumProps extends UIProps {
    path?: string;
    level?: string;
    filter?: (data: any) => boolean;
    [propName: string]: any;
  }
  export const S3Album: React.ComponentClass<S3AlbumProps>;

  // *** INTERACTIONS ***
  export const ChatBot: React.ComponentClass<any>;
}
