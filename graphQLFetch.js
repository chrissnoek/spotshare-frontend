import { toast, ToastType } from "react-toastify";
import fetch from "isomorphic-fetch";

const dateRegex = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d");

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

export default async function graphQLFetch(
  query,
  variables = {},
  returnError = false
) {
  const apiEndpoint =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/graphql";

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    // alert the error message whenthe result is containing erros
    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == "BAD_USER_INPUT") {
        console.log(error);
        const details = error.extensions.exception.errors.join("\n ");
        toast.error(`${error.message}\n ${details}`);
        if (returnError) return result;
      } else {
        toast.error(`${error.extensions.code}\n ${error.message}`);
        if (returnError) return result;
      }
    }
    return result.data;
  } catch (e) {
    toast.error(`Error in sending data to server: ${e.message}`);
  }
}
