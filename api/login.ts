import axios, { AxiosPromise } from "axios";

interface UserPayload {
  id: string;
  email: string;
  token: string;
}

interface LoginResponse {
  user: UserPayload;
}

function login(email: string, password: string): AxiosPromise<LoginResponse> {
  const apiBaseUrl = __DEV__
    ? "http://10.0.2.2:4741" // 10.0.2.2 == localhost that makes AVD happy
    : "https://waitlist-api.herokuapp.com"; // TODO: verify this endpoint

  return axios({
    url: apiBaseUrl + "/sign-in",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    data: {
      credentials: {
        email: email,
        password: password,
      },
    },
  });
}

export default login;
