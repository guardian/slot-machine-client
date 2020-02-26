import { Metadata } from "./types";

const apiURL = "https://contributions.guardianapis.com/epic";

export const getBodyEnd = (meta: Metadata, useUrl?: string): Promise<Response> => {
  const json = JSON.stringify(meta);
  return fetch(useUrl || apiURL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: json
  });
};
