import { BASE_URL } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export function request(path, options) {
  return fetch(BASE_URL + path, options).then(checkResponse);
}
