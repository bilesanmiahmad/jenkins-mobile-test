import axios from "axios";
import _ from "lodash";

import { EnvironmentType, getEnvironmentApiUrl } from "@/utils/envs";
import { defaultErrorMessage } from "./common";
import * as errorMessages from "./errorMessages";
import { ErrorId } from "./errorMessages";
import { authStore, LOGIN_KEY, ZST_AUTH_KEY } from "@/context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

/*
 * ERROR HANDLING
 *
 * Each query / mutation can define its own error message that best describes the context of what went wrong and the consequences.
 * Example: login mutation can define error message as: `Couldn't log you in` rather than relying on PrimerErrorId that could just be EntityDoesntExists
 *
 * These are the steps in determining what is shown to user:
 *
 * 1. is `params.onError.message` defined? If yes, just use that and don't fallback
 * 2. fallback to matching ErrorId unless `params.onError.skipPrimerErrorId` is set to true
 * 3. fallback to general error unless `params.onError.skipDefault` is set to true
 */

const client = axios.create();

client.defaults.withCredentials = true;

// Define the maximum number of retries
const MAX_RETRIES = 3;

// Define the delay between retries in milliseconds
const RETRY_DELAY = 5000;

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    // TODO "|| error" is a quickfix here, not sure if it ever worked with error.response
    const response = error.response || error || {};

    const params = _.get(response, "config.__params", {});
    const payload = _.get(response, "config.data", {});
    const queryParams = _.get(response, "config.__queryParams", {});
    const errorMsg = _.get(response, "data.message", {});

    const errorId = _.get(response, "data.error.errorId");

    const isUnauthorized = response.status === 401;
    const isForbidden = response.status === 403;
    const retries =
      (((error as Record<string, unknown>).config as Record<string, unknown>)
        .retries as number) || 0;

    if (isUnauthorized && retries < MAX_RETRIES) {
      // Get the number of retries so far

      // If we haven't reached the maximum number of retries
      // Wait for the specified delay

      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));

      // Clone the request config to prevent modifying the original request
      const config = {
        ...((error as Record<string, unknown>).config || {}),
      };

      // Increment the number of retries
      (config as { retries: number }).retries = retries + 1;

      // Retry the request
      return client(config);
    }

    if (isUnauthorized || isForbidden) {
      if (!params.skipTokenPurgingOnUnauthorized) {
        authStore.setState({ auth_token: null });
        authStore.setState({ session: false });
        await AsyncStorage.removeItem(ZST_AUTH_KEY);
        await SecureStore.deleteItemAsync(LOGIN_KEY);
      }

      if (!params.skipReloadOnUnauthorized) {
        // window.location.reload();
      }
    }

    let errorMessage;

    if (params.onError && !params.onError.skipAll) {
      if (params.onError.message) {
        errorMessage =
          typeof params.onError.message === "string"
            ? params.onError.message
            : params.onError.message({
                errorId,
                ...JSON.parse(payload ?? {}), // payload is a JSON string at this moment
                ...queryParams,
              });
      } else if (
        !params.onError.skipPrimerErrorId &&
        errorMessages.errorType[errorId]
      ) {
        errorMessage = errorMessages.errorType[errorId];
      } else if (!params.onError.skipDefault) {
        errorMessage = defaultErrorMessage;
      }
    }
    if (!params.onError) {
      errorMessage = defaultErrorMessage;
    }

    if (errorMessage || errorMsg) {
      //TODO: implement toast for error handling
    }

    // Augmenting the Errorfallback
    error.ErrorId = errorId;
    error.httpCode = parseInt(response.status, 10);
    error.httpCodeText = response.statusText;

    throw error;
  },
);

type MessageFunctionParams = {
  ErrorId: ErrorId;
} & Record<PropertyKey, unknown>;

type ParamsPayload = {
  skipReloadOnUnauthorized?: boolean;
  skipTokenPurgingOnUnauthorized?: boolean;
  onError?: {
    /**
     * If defined, no other error in Toast will be shown
     */
    message?: string | ((args: MessageFunctionParams) => string);

    /**
     * Allows to further customise error toast
     */
    toastOptions?: Record<PropertyKey, unknown>;

    /**
     * Should the error handling fall all down to default message this allows to skip that as well
     * @default false
     */
    skipDefault?: boolean;

    /**
     * Should the error handling fall to mapping to PrimerErrorId this allows to skip that
     * @default false
     */
    skipErrorId?: boolean;

    /**
     * Skip showing any error message in toast - useful if the error is handled by some visual error state
     */
    skipAll?: boolean;
  };
};

export type CreateApiRequestOptions = {
  baseUrl: EnvironmentType;
  url:
    | string
    | ((
        formatted: Record<PropertyKey, unknown>,
        pathParams: Record<PropertyKey, unknown>,
      ) => string);
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
  content?: "json" | "form" | "form-multipart";
  queryParams?:
    | ((object: Record<PropertyKey, unknown>) => Record<PropertyKey, unknown>)
    | Record<PropertyKey, unknown>;
  authenticate?: boolean;
  format?: (object: any) => Record<PropertyKey, unknown>;
  payload?: (object: any) => Record<PropertyKey, unknown>;
  params?: ParamsPayload;
};

function toQueryString(
  fields: Record<PropertyKey, unknown> | ArrayLike<unknown>,
): string {
  const entries = Object.entries(fields);

  if (entries.length === 0) {
    return "";
  }

  const params = entries
    .filter(([, v]) => !!v)
    .map(
      ([key, val]) =>
        `${key}=${encodeURIComponent(val as string | number | boolean)}`,
    );

  return `?${params.join("&")}`;
}

function identity<T>(val: T): T {
  return val;
}

const getKey = (obj: { [x: string]: unknown }) =>
  Object.keys(obj).filter((k) => obj[k])[0];
const getValue = (obj: ArrayLike<unknown> | { [s: string]: unknown }): any =>
  Object.values(obj).filter((k: any) => k)[0];

function toFormData(fields: any): FormData {
  const formData = new FormData();
  Object.keys(fields).forEach((key) => {
    if (typeof fields[key] === "object") {
      if (_.hasIn(fields[key], "GHS" || "USD")) {
        formData.append(
          `${key}[${getKey(fields[key])}]`,
          getValue(fields[key]),
        );
      } else if (_.hasIn(fields[key], "path" || "size" || "type" || "name")) {
        formData.append(key, fields[key]);
      } else {
        Object.keys(fields[key]).forEach((k) => {
          if (typeof fields[key][k] === "object") {
            for (let i = 0; i < fields[key][k].length; i++) {
              formData.append(`${key}[${k}][${i}]`, fields[key][k][i]);
            }
          } else {
            formData.append(`${key}[${k}]`, fields[key][k]);
          }
        });
      }
    } else if (typeof fields[key] !== "object") {
      formData.append(key, fields[key]);
    } else formData.append(key, JSON.stringify(fields[key]));
  });
  return formData;
}

export default function createApiRequest({
  baseUrl,
  url,
  method,
  content = "json",
  queryParams,
  authenticate = true,
  format = identity,
  payload = identity,
  params = {},
}: CreateApiRequestOptions) {
  return async function query(
    fields = {},
    pathParams: Record<PropertyKey, unknown>,
  ) {
    const headers: Record<string, unknown> = {};
    const formatted = typeof fields === "object" ? format(fields) : {};
    const endpoint =
      typeof url === "function" ? url(formatted, pathParams) : url;
    const queryObject =
      typeof queryParams === "function" ? queryParams(formatted) : queryParams;

    const token = SecureStore.getItemAsync(LOGIN_KEY);

    //`TODO: get access token from auth store and fix this
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    switch (content) {
      case "json":
        headers["Content-Type"] = "application/json";
        break;

      case "form":
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        break;

      case "form-multipart":
        headers["Content-Type"] = "multipart/form-data";
        break;

      default:
        break;
    }

    const options: Record<PropertyKey, unknown> = {
      url: `${getEnvironmentApiUrl(baseUrl)}${endpoint}`,
      headers,
      method,
    };

    if (method !== "GET") {
      const data =
        typeof payload === "function" ? payload(formatted) : formatted;
      options.data = content.startsWith("form")
        ? toFormData(data as Record<PropertyKey, string>)
        : data;
    }

    if (queryObject) {
      options.url += toQueryString(queryObject);
    }

    options.__params = params;
    options.__queryParams = queryObject ?? {};

    const response = await client(options);

    /**
     * Quick fix to go around dynamodb cursor-based pagination.
     */
    if (
      response.data &&
      response.data.data &&
      Array.isArray(response.data.data) &&
      !_.has(response.data, "prevCursor")
    ) {
      return response.data.data;
    }
    return response.data;
  };
}
