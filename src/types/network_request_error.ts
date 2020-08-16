import SumType from "sums-up";
import { AxiosError } from "axios";

function isAxiosError(err: unknown): err is AxiosError {
  return (err as AxiosError).isAxiosError === true;
}

class NetworkRequestError extends SumType<{
  BadRequest: [];
  Unauthorized: [];
  Forbidden: [];
  NotFound: [];
  ServerDown: [];
  Timeout: [];
  OtherResponse: [number];
  NoResponse: [any]; // return the request (http.ClientRequest in node.js)
  Unknown: [string];
}> {}

function BadRequest(): NetworkRequestError {
  return new NetworkRequestError("BadRequest");
}

function Unauthorized(): NetworkRequestError {
  return new NetworkRequestError("Unauthorized");
}

function Forbidden(): NetworkRequestError {
  return new NetworkRequestError("Forbidden");
}

function NotFound(): NetworkRequestError {
  return new NetworkRequestError("NotFound");
}

function ServerDown(): NetworkRequestError {
  return new NetworkRequestError("ServerDown");
}

function Timeout(): NetworkRequestError {
  return new NetworkRequestError("Timeout");
}

function OtherResponse(statusCode: number): NetworkRequestError {
  return new NetworkRequestError("OtherResponse", statusCode);
}

function NoResponse(request: any): NetworkRequestError {
  return new NetworkRequestError("NoResponse", request);
}

function Unknown(errMsg: string): NetworkRequestError {
  return new NetworkRequestError("Unknown", errMsg);
}

function fromGenericError(error: unknown): NetworkRequestError {
  if (!isAxiosError(error)) {
    return Unknown(String(error));
  }

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    switch (error.response.status) {
      case 400:
        return BadRequest();
      case 401:
        return Unauthorized();
      case 403:
        return Forbidden();
      case 404:
        return NotFound();
      case 503:
        return ServerDown();
      case 504:
        return Timeout();
      default:
        console.warn("Request responded with: ", error.response.status);
        return OtherResponse(error.response.status);
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return NoResponse(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    return Unknown(error.message);
  }
}

export {
  NetworkRequestError,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  ServerDown,
  Timeout,
  OtherResponse,
  NoResponse,
  Unknown,
  fromGenericError,
};
