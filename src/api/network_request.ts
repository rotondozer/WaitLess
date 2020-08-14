import axios, { Method, AxiosPromise, AxiosResponse } from "axios";
import { Maybe, AsyncResult } from "seidr";
import { NetworkRequestError } from "types";

export type NetworkRequest<T> = AsyncResult<
  NetworkRequestError.NetworkRequestError,
  T
>;

const BASE_URL = __DEV__
  ? "http://10.0.2.2:4741" // 10.0.2.2 == localhost that makes AVD happy
  : "https://waitlist-api.herokuapp.com"; // TODO: verify this endpoint

const BASE_HEADER = { "content-type": "application/json" };

function toAxiosPromise<T>(
  endPoint: string,
  method: Method,
  token?: string,
  data?: {}, // TODO typez
): AxiosPromise<T> {
  return axios({
    url: `${BASE_URL}/${endPoint}`,
    method,
    headers: Maybe.fromNullable(token)
      .map(t => ({
        ...BASE_HEADER,
        Authorization: "Token token=" + t,
      }))
      .getOrElse(BASE_HEADER),
    data,
  });
}

function toNetworkRequest<T>(
  axiosPromise: AxiosPromise<T>,
): NetworkRequest<AxiosResponse<T>> {
  return AsyncResult.fromPromise(
    NetworkRequestError.fromGenericError,
    axiosPromise,
  );
}

// TODO: replace url export with config helper
export default BASE_URL;
export { toAxiosPromise, toNetworkRequest };
