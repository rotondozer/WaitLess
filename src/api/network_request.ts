import axios, { Method, AxiosResponse, AxiosRequestConfig } from "axios";
import { AsyncResult } from "seidr";
import { NetworkRequestError, ActiveUser } from "types";

export type NetworkRequest<T> = AsyncResult<
  NetworkRequestError.NetworkRequestError,
  T
>;

const BASE_URL = __DEV__
  ? "http://10.0.2.2:4741" // 10.0.2.2 == localhost that makes AVD happy
  : "https://waitlist-api.herokuapp.com"; // TODO: verify this endpoint

const BASE_HEADER = { "content-type": "application/json" };

function toNetworkRequest<T>(
  method: Method,
  endPoint: string,
  activeUser: ActiveUser.ActiveUser,
  data?: {}, // TODO typez,
): NetworkRequest<AxiosResponse<T>> {
  return AsyncResult.fromPromise(
    NetworkRequestError.fromGenericError,
    axios({
      method,
      ...urlAndHeadersFromActiveUser(activeUser, endPoint),
      data,
    }),
  );
}

// -- PRIVATE
/**
 * Build a partial `AxiosRequestConfig` for the url and headers together. Both differ with and without
 * an `activeUser`
 * @param activeUser Currently logged in user. All Tables and Parties are user-owned, so the endpoint
 * is preceded as such, and the header includes a token.
 */
function urlAndHeadersFromActiveUser(
  activeUser: ActiveUser.ActiveUser,
  endpoint: string,
): AxiosRequestConfig {
  return activeUser.caseOf({
    None: () => ({ url: `${BASE_URL}/${endpoint}`, headers: BASE_HEADER }),
    User: (id, token, _) => ({
      url: `${BASE_URL}/users/${id}/${endpoint}`,
      headers: { ...BASE_HEADER, Authorization: "Token token=" + token },
    }),
  });
}

// TODO: replace url export with config helper
export default BASE_URL;
export { toNetworkRequest };
