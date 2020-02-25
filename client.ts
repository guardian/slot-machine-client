import fetch, { Response } from "node-fetch";
import { Metadata } from "./types";

const apiURL = "https://contributions.guardianapis.com/epic";

export const getBodyEnd = (meta: Metadata): Promise<Response> => {
  const json = JSON.stringify(meta);
  return fetch(apiURL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: json
  });
};
